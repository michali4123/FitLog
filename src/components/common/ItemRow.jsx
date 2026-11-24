import "../../css/common/ItemRow.css";

// One row of a list: the id of the item, and after it whatever the item needs.
export default function ItemRow({ itemId, children }) {
  return (
    <div className="item-row">
      <span className="item-id">#{itemId}</span>
      {children}
    </div>
  );
}
