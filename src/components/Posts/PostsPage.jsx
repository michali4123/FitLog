import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../../js/hooks/useUser";
import { useServerList } from "../../js/hooks/useServerList";
import { useSearch } from "../../js/hooks/useSearch";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "../common/ListView";
import PostsNav from "./PostsNav";
import AddPost from "./AddPost";
import SinglePost from "./SinglePost";

// the parts of the posts page: "" = my posts, "all" = all posts, "new" = add a post
const POSTS_VIEWS = ["", "all", "new"];

// Posts page: /posts = my posts, /posts/all = all posts, /posts/new = add.
// All the posts are loaded once - "my posts" are filtered from them.
export default function PostsPage() {
  const { user } = useUser(); // the logged-in user, from UserContext
  const view = useParams()["*"];
  const posts = useServerList("posts", {}, "post");
  const search = useSearch(posts.items, "title");
  const [selectedPostId, setSelectedPostId] = useState(null); // the post whose content is shown

  // a URL like /posts/xyz -> back to my posts
  if (!POSTS_VIEWS.includes(view)) {
    return <Navigate to={`/${user.username}/posts`} replace />;
  }

  // click on the open post closes it, click on another post opens it
  function toggleSelectedPost(postId) {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  }

  function isMyPost(post) {
    return post.userId === user.id;
  }

  function renderPost(post) {
    return (
      <SinglePost
        key={post.id}
        post={post}
        isSelected={post.id === selectedPostId}
        onSelect={toggleSelectedPost}
        onUpdate={posts.updateItem}
        onDelete={posts.deleteItem}
      />
    );
  }

  const isAllPostsView = view === "all";
  const visiblePosts = isAllPostsView ? search.results : search.results.filter(isMyPost);
  const listTitle = isAllPostsView ? "All Posts" : "My Posts";

  const viewElement =
    view === "new" ? (
      <AddPost onAdd={posts.addItem} />
    ) : (
      <>
        <h2>{listTitle}</h2>
        <ListView
          items={visiblePosts}
          isLoading={posts.isLoading}
          emptyText="No posts found."
          renderItem={renderPost}
        />
      </>
    );

  return (
    <section className="page">
      <PostsNav view={view} search={search} />
      <ErrorMessage message={posts.errorMessage} />
      {viewElement}
    </section>
  );
}
