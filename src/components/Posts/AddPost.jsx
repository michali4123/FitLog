import { useNavigate } from "react-router-dom";
import { POST_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";

// Add a new post (/:username/posts/new).
// The post is always saved for the LOGGED-IN user (userId is not a field in the form),
// so a user can add a post only for himself.
export default function AddPost({ user, onAdd }) {
  const navigate = useNavigate();
  const myPostsUrl = `/${user.username}/posts`;

  async function publishPost(newPostValues) {
    const isAdded = await onAdd({ userId: user.id, ...newPostValues });
    if (isAdded) navigate(myPostsUrl); // back to "my posts" - the new post is there
    return isAdded;
  }

  function goToMyPosts() {
    navigate(myPostsUrl);
  }

  return (
    <ItemForm
      fields={POST_FIELDS}
      submitText="Publish"
      onSubmit={publishPost}
      onCancel={goToMyPosts}
      autoFocus
      className="card big-form"
    >
      <h2>New Post</h2>
      <p className="form-note">
        Posting as <strong>{user.name}</strong>
      </p>
    </ItemForm>
  );
}
