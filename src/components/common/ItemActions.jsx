import "../../css/common/ItemActions.css";

// The buttons of one item (task, album, photo, post, comment).
// children = (optional) more buttons / links before Edit and Delete.
// Edit / Delete are shown only if their function was passed.
export default function ItemActions({ onEdit, onDelete, isDisabled = false, children }) {
  return (
    <div className="item-actions">
      {children}
      {onEdit && (
        <button type="button" onClick={onEdit} disabled={isDisabled}>
          Edit
        </button>
      )}
      {onDelete && (
        <button type="button" className="danger" onClick={onDelete} disabled={isDisabled}>
          Delete
        </button>
      )}
    </div>
  );
}
