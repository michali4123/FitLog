import { useState } from "react";
import { useServerList } from "../../js/hooks/useServerList";
import { COMMENT_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "../common/ListView";
import CommentItem from "./CommentItem";
import "../../css/Comments/Comments.css";

// The comments of one post. Only OTHER users can comment on a post,
// and every user can edit / delete only his own comments.
export default function Comments({ post, user }) {
  const comments = useServerList("comments", { postId: post.id }, "comment");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const canAddComment = post.userId !== user.id;

  function openAddForm() {
    setIsAddFormOpen(true);
  }

  function closeAddForm() {
    setIsAddFormOpen(false);
  }

  async function addComment(newCommentValues) {
    // the details of the logged-in user - so it is clear who added it
    const isAdded = await comments.addItem({
      postId: post.id,
      userId: user.id,
      email: user.email,
      ...newCommentValues,
    });
    if (isAdded) closeAddForm();
    return isAdded;
  }

  function renderComment(comment) {
    return (
      <CommentItem
        key={comment.id}
        comment={comment}
        user={user}
        onUpdate={comments.updateItem}
        onDelete={comments.deleteItem}
      />
    );
  }

  let addCommentElement;
  if (!canAddComment) {
    addCommentElement = (
      <p className="form-note">This is your post - only other users can comment on it.</p>
    );
  } else if (isAddFormOpen) {
    addCommentElement = (
      <ItemForm
        fields={COMMENT_FIELDS}
        submitText="Send"
        onSubmit={addComment}
        onCancel={closeAddForm}
        autoFocus
        className="nested-form"
      >
        <p className="form-note">
          Commenting as <strong>{user.name}</strong>
        </p>
      </ItemForm>
    );
  } else {
    addCommentElement = (
      <button type="button" className="add-open-button" onClick={openAddForm}>
        + Add comment
      </button>
    );
  }

  return (
    <div className="comments">
      <h4 className="comments-title">Comments ({comments.items.length})</h4>
      {addCommentElement}
      <ErrorMessage message={comments.errorMessage} />
      <ListView
        items={comments.items}
        isLoading={comments.isLoading}
        emptyText="No comments yet."
        renderItem={renderComment}
      />
    </div>
  );
}
