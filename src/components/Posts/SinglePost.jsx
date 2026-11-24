import { useUser } from "../../js/hooks/useUser";
import { useEditMode } from "../../js/hooks/useEditMode";
import { POST_FIELDS } from "../../js/config/fields";
import ItemRow from "../common/ItemRow";
import ItemForm from "../common/ItemForm";
import ItemActions from "../common/ItemActions";
import PostContent from "./PostContent";

// One post: the row (id, title, buttons), the edit form, and the content when selected.
// Edit / Delete only on my posts.
export default function SinglePost({ post, isSelected, onSelect, onUpdate, onDelete }) {
  const { user } = useUser();
  const editMode = useEditMode(post.id, onUpdate);
  const isMine = post.userId === user.id;

  function toggleContent() {
    onSelect(post.id);
  }

  function deletePost() {
    onDelete(post.id);
  }

  const contentButtonText = isSelected ? "Hide content" : "Select & show content";

  return (
    <li className={`item-card ${isSelected ? "selected" : ""}`}>
      <ItemRow itemId={post.id}>
        <span className="item-title">{post.title}</span>
        {isMine && <span className="badge">Mine</span>}
        <ItemActions
          onEdit={isMine ? editMode.startEditing : null}
          onDelete={isMine ? deletePost : null}
          isDisabled={editMode.isEditing}
        >
          <button type="button" onClick={toggleContent}>
            {contentButtonText}
          </button>
        </ItemActions>
      </ItemRow>

      {editMode.isEditing && (
        <ItemForm
          fields={POST_FIELDS}
          initialValues={post}
          submitText="Save"
          onSubmit={editMode.saveChanges}
          onCancel={editMode.stopEditing}
          autoFocus
          className="nested-form"
        />
      )}

      {isSelected && <PostContent post={post} />}
    </li>
  );
}
