import { useNavigate } from "react-router-dom";
import { isUsernameTaken } from "../../js/services/authService";
import { REGISTER_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";

// Register page (/register): the form only.
// If the username is free, moves to /register/details to complete the details.
// Nothing is saved on the server yet.
export default function Register() {
  const navigate = useNavigate();

  async function checkNewAccount(accountValues) {
    if (accountValues.password !== accountValues.verifyPassword) {
      throw new Error("The passwords do not match.");
    }
    if (await isUsernameTaken(accountValues.username)) {
      throw new Error("This username already exists.");
    }

    // pass username + password to the next screen
    navigate("/register/details", {
      state: { username: accountValues.username, password: accountValues.password },
    });
    return true;
  }

  return (
    <ItemForm
      fields={REGISTER_FIELDS}
      submitText="Continue"
      onSubmit={checkNewAccount}
      autoFocus
      className="auth-form"
    >
      <h1 className="auth-title">Register</h1>
    </ItemForm>
  );
}
