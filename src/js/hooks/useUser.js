import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Returns { user, loginUser, logoutUser } - the logged-in user from UserProvider.
export function useUser() {
  return useContext(UserContext);
}
