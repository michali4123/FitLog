import "../../css/common/ListView.css";

// Shows a list: "Loading..." while loading, a message if it is empty, otherwise the items.
// renderItem(item) returns the element of one item.
export default function ListView({ items, isLoading, emptyText, renderItem, className = "" }) {
  if (isLoading) return <p>Loading...</p>;
  if (items.length === 0) return <p className="empty-message">{emptyText}</p>;

  const itemElements = items.map(renderItem);
  return <ul className={`item-list ${className}`}>{itemElements}</ul>;
}
