import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { getCurrentUser } from "../../js/storage/currentUser";

// The user's page (/:username): the header on top,
// and under it the current inner page (todos / albums / photos...).
export default function UserPage() {
  const user = getCurrentUser();
  const { username } = useParams(); // the username written in the URL
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />; // nobody is logged in

  // the URL has another user's name (e.g. /Bret/todos while "Antonette" is logged in)
  // -> the same page, but with the name of the logged-in user
  if (username !== user.username) {
    const rest = location.pathname.split("/").slice(2).join("/"); // "todos", "albums/3/photos"...
    return <Navigate to={`/${user.username}/${rest}`} replace />;
  }

  return (
    <>
      <Header user={user} />
      {/* the inner pages get the user with useOutletContext() */}
      <Outlet context={user} />
    </>
  );
}
