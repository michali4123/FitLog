import { useEffect, useReducer, useState } from "react";
import { api } from "../api/client";
import { listReducer } from "../reducers/listReducer";

// Generic hook for a list that lives on the server (todos, posts, comments, albums, photos).
// Loads the list once when the page opens, and adds / updates / deletes items:
// first on the server, and only if it succeeded - on the screen.
//
// resource = the name of the list on the server, e.g. "todos"
// filters  = which items to bring, e.g. { userId: 1 }
// itemName = the name of one item for the messages, e.g. "task"
// pageSize = (optional) how many items to load each time. 0 = all of them at once
export function useServerList(resource, filters, itemName, pageSize = 0) {
  const [items, dispatch] = useReducer(listReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadedCount, setLoadedCount] = useState(0); // how many items we already read from the server
  const [hasMore, setHasMore] = useState(false); // are there more items on the server?

  // Brings the part of the list that starts at "start".
  // Asks for one item MORE than pageSize - if it came back, there are more items.
  async function fetchPart(start) {
    const partFilters = pageSize > 0 ? { ...filters, _start: start, _limit: pageSize + 1 } : filters;
    const fetchedItems = await api(resource, { type: "GET", filters: partFilters });
    if (pageSize === 0) return { partItems: fetchedItems, isMoreOnServer: false };
    return {
      partItems: fetchedItems.slice(0, pageSize),
      isMoreOnServer: fetchedItems.length > pageSize,
    };
  }

  // Load the first part once, when the page opens.
  // The user and the filters do not change while the page is open, so nothing goes in the dependencies.
  useEffect(() => {
    let isPageClosed = false; // prevents updating state after leaving the page

    async function loadFirstPart() {
      try {
        const { partItems, isMoreOnServer } = await fetchPart(0);
        if (isPageClosed) return;
        dispatch({ type: "LOAD", items: partItems });
        setLoadedCount(partItems.length);
        setHasMore(isMoreOnServer);
      } catch {
        if (!isPageClosed) setErrorMessage(`Could not load the ${itemName}s. Is the server running?`);
      } finally {
        if (!isPageClosed) setIsLoading(false);
      }
    }

    loadFirstPart();

    return () => {
      isPageClosed = true;
    };
    // on purpose: no functions and no user in the dependencies - load only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMore() {
    setIsLoadingMore(true);
    try {
      const { partItems, isMoreOnServer } = await fetchPart(loadedCount);
      dispatch({ type: "LOAD_MORE", items: partItems });
      setLoadedCount(loadedCount + partItems.length);
      setHasMore(isMoreOnServer);
      setErrorMessage("");
    } catch {
      setErrorMessage(`Could not load more ${itemName}s.`);
    }
    setIsLoadingMore(false);
  }

  // All the actions return true if they succeeded, so a form knows if to clear itself.
  async function addItem(newItem) {
    try {
      const savedItem = await api(resource, { type: "ADD", item: newItem });
      dispatch({ type: "ADD", item: savedItem });
      setErrorMessage("");
      return true;
    } catch {
      setErrorMessage(`Could not add the ${itemName}.`);
      return false;
    }
  }

  async function updateItem(itemId, changes) {
    try {
      const updatedItem = await api(resource, { type: "UPDATE", id: itemId, changes });
      dispatch({ type: "UPDATE", item: updatedItem });
      setErrorMessage("");
      return true;
    } catch {
      setErrorMessage(`Could not update the ${itemName}.`);
      return false;
    }
  }

  async function deleteItem(itemId) {
    if (!window.confirm(`Delete this ${itemName}?`)) return false;
    try {
      await api(resource, { type: "DELETE", id: itemId });
      dispatch({ type: "DELETE", id: itemId });
      // one item less on the server, so the next items move one place back
      if (loadedCount > 0) setLoadedCount(loadedCount - 1);
      setErrorMessage("");
      return true;
    } catch {
      setErrorMessage(`Could not delete the ${itemName}.`);
      return false;
    }
  }

  return {
    items,
    isLoading,
    isLoadingMore,
    errorMessage,
    hasMore,
    loadMore,
    addItem,
    updateItem,
    deleteItem,
  };
}
