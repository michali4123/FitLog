import { NavLink } from "react-router-dom";
import { useUser } from "../../js/hooks/useUser";
import { ID_TITLE_SEARCH_OPTIONS } from "../../js/config/fields";
import SearchBar from "../common/SearchBar";
import "../../css/Posts/PostsNav.css";

// The bar of the posts page: the links (my / all / new) and the search.
export default function PostsNav({ view, search }) {
  const { user } = useUser();
  const postsUrl = `/${user.username}/posts`;
  const showSearch = view !== "new"; // no search on the add form

  return (
    <div className="card toolbar">
      <nav className="posts-nav-links">
        {/* "end" - active only on /posts itself, not on /posts/all */}
        <NavLink to={postsUrl} end>My posts</NavLink>
        <NavLink to={`${postsUrl}/all`}>All posts</NavLink>
        <NavLink to={`${postsUrl}/new`} className="posts-nav-add">+ New post</NavLink>
      </nav>

      {showSearch && <SearchBar search={search} searchOptions={ID_TITLE_SEARCH_OPTIONS} />}
    </div>
  );
}
