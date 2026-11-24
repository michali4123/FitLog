import { useNavigate } from "react-router-dom";
import { logout } from "../../js/services/authService";

// Logs the user out (deletes him from LS) and goes back to the login page.
export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <button type="button" className="danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
