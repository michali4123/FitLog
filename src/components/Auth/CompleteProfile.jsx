import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../js/services/authService";
import { useUser } from "../../js/hooks/useUser";
import { PROFILE_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";

// Second step of register (/register/details): the form only.
// Saving the new user happens in authService.
export default function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const account = location.state; // username + password from the register screen

  if (!account) return <Navigate to="/register" replace />; // got here without registering

  async function saveProfile(profileValues) {
    const newUser = await register(account, profileValues);
    loginUser(newUser); // the new user is logged in right away
    navigate(`/${newUser.username}`, { replace: true });
    return true;
  }

  return (
    <ItemForm
      fields={PROFILE_FIELDS}
      submitText="Finish & enter"
      onSubmit={saveProfile}
      autoFocus
      className="auth-form"
    >
      <h1 className="auth-title">Complete your details, {account.username}</h1>
    </ItemForm>
  );
}
