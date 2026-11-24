import { useUser } from "../../js/hooks/useUser";
import { useEditMode } from "../../js/hooks/useEditMode";
import { COMMENT_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";
import ItemActions from "../common/ItemActions";

// One comment: who wrote it, the title and the text.
// Edit / Delete only on my comments.
export default function CommentItem({ comment, onUpdate, onDelete }) {
  const { user } = useUser();
  const editMode = useEditMode(comment.id, onUpdate);
  const isMine = comment.userId === user.id;

  function deleteComment() {
    onDelete(comment.id);
  }

  const contentElement = editMode.isEditing ? (
    <ItemForm
      fields={COMMENT_FIELDS}
      initialValues={comment}
      submitText="Save"
      onSubmit={editMode.saveChanges}
      onCancel={editMode.stopEditing}
      autoFocus
      className="full-width"
    />
  ) : (
    <>
      <strong>{comment.name}</strong>
      <p className="comment-body">{comment.body}</p>
    </>
  );

  const showActions = isMine && !editMode.isEditing;

  return (
    <li className={`comment-item ${isMine ? "mine" : ""}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.email}</span>
        {isMine && <span className="badge">You</span>}
      </div>
      {contentElement}
      {showActions && <ItemActions onEdit={editMode.startEditing} onDelete={deleteComment} />}
    </li>
  );
}
