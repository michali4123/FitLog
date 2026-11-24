import { useState } from "react";

// Checks if one item matches the search, according to the type of the field.
function matches(item, field, query) {
  const fieldValue = item[field];
  const searchText = query.trim();

  if (typeof fieldValue === "boolean") return String(fieldValue) === searchText; // "true" / "false"
  if (typeof fieldValue === "number") return String(fieldValue) === searchText; // exact id
  return String(fieldValue).toLowerCase().includes(searchText.toLowerCase()); // part of the text
}

// Generic search hook - works for todos, posts, albums...
// Returns the search state and the filtered list.
export function useSearch(items, initialField) {
  const [field, setField] = useState(initialField);
  const [query, setQuery] = useState("");

  let results = items;
  if (query.trim() !== "") {
    results = items.filter((item) => matches(item, field, query));
  }

  function changeField(newField) {
    setField(newField);
    setQuery(""); // a query for "title" means nothing for "id"
  }

  return { field, setField: changeField, query, setQuery, results };
}
