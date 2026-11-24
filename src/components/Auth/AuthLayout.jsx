import { NavLink, Outlet } from "react-router-dom";
import "../../css/Auth/AuthLayout.css";

// The design around the login / register pages:
// a gym photo in the background, and a card -
// on top: the site name on black, under it: tabs to move between Login and Register,
// and the current page (login / register / details).
export default function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-top">
          <p className="brand auth-brand">FitLog</p>
          <p className="auth-slogan">Track your workouts, share tips, keep your photo albums.</p>
        </div>
        <div className="gold-line" />

        <div className="auth-card-body">
          <nav className="auth-tabs">
            <NavLink to="/login">Login</NavLink>
            {/* stays active also on /register/details */}
            <NavLink to="/register">Register</NavLink>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
