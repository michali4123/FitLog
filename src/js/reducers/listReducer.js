// One reducer for ALL the lists (todos, posts, comments, albums, photos).
// It does NOT talk to the server - it is called only after the server succeeded.
//
// items  = the list on the screen right now
// action = what to do, e.g. { type: "DELETE", id: 5 }
// returns the new list
export function listReducer(items, action) {
  switch (action.type) {
    case "LOAD":
      return action.items;

    case "LOAD_MORE": {
      // skip items that are already on the screen (for example an item we just added)
      const newItems = action.items.filter(
        (loadedItem) => !items.some((shownItem) => shownItem.id === loadedItem.id)
      );
      // sort by id, so an item we just added stays at the end (like on the server)
      return [...items, ...newItems].sort((firstItem, secondItem) => firstItem.id - secondItem.id);
    }

    case "ADD":
      return [...items, action.item];

    case "UPDATE":
      return items.map((item) => (item.id === action.item.id ? action.item : item));

    case "DELETE":
      return items.filter((item) => item.id !== action.id);

    default:
      return items;
  }
}
