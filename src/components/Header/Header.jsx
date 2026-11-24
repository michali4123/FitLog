import { NavLink } from "react-router-dom";
import InfoButton from "./InfoButton";
import LogoutButton from "./LogoutButton";
import { useUser } from "../../js/hooks/useUser";
import "../../css/Header/Header.css";

// Top of the user's page: the site name, welcome title + the links.
// Under it - a thin gold line.
export default function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <div className="header-main">
        <div>
          <span className="brand">FitLog</span>
          <h1 className="header-title">Welcome, {user.name}</h1>
        </div>

        <nav className="header-nav">
          <InfoButton />
          <NavLink to={`/${user.username}/todos`}>Workouts</NavLink>
          <NavLink to={`/${user.username}/posts`}>Community</NavLink>
          <NavLink to={`/${user.username}/albums`}>Albums</NavLink>
          <LogoutButton />
        </nav>
      </div>
      <div className="gold-line" />
    </header>
  );
}
