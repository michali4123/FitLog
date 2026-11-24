import { useState } from "react";
import Comments from "../Comments/Comments";
import "../../css/Posts/PostContent.css";

// The content of the selected post + a button that shows its comments.
export default function PostContent({ post, user }) {
  const [showComments, setShowComments] = useState(false);

  function toggleComments() {
    setShowComments(!showComments);
  }

  const commentsButtonText = showComments ? "Hide comments" : "Show comments";

  return (
    <div className="post-content">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <button type="button" className="post-comments-toggle" onClick={toggleComments}>
        {commentsButtonText}
      </button>

      {showComments && <Comments post={post} user={user} />}
    </div>
  );
}
