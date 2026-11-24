import { useNavigate } from "react-router-dom";
import { useUser } from "../../js/hooks/useUser";

// Logs the user out (deletes him from the Context and LS) and goes back to the login page.
export default function LogoutButton() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <button type="button" className="danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
