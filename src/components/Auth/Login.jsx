import { useNavigate } from "react-router-dom";
import { login } from "../../js/services/authService";
import { LOGIN_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";

// Login page (/login): the form only.
// Checking the user against the server happens in authService.
// A wrong username / password throws an error - ItemForm shows its message.
export default function Login() {
  const navigate = useNavigate();

  async function handleLogin(loginValues) {
    const user = await login(loginValues.username, loginValues.password);
    navigate(`/${user.username}`, { replace: true });
    return true;
  }

  return (
    <ItemForm
      fields={LOGIN_FIELDS}
      submitText="Login"
      onSubmit={handleLogin}
      autoFocus
      className="auth-form"
    >
      <h1 className="auth-title">Login</h1>
    </ItemForm>
  );
}
