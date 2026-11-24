import { useState } from "react";
import { UserContext } from "../../js/context/UserContext";
import { getCurrentUser, saveCurrentUser, removeCurrentUser } from "../../js/storage/currentUser";

// Wraps the app and gives every component inside it the logged-in user.
// Every component that needs the user calls useUser() - no need to pass it as props.
export default function UserProvider({ children }) {
  // starts from the user saved in LS, so a refresh (F5) does not log out
  const [user, setUser] = useState(getCurrentUser);

  // after login / register: save in LS + update all the components
  function loginUser(loggedInUser) {
    saveCurrentUser(loggedInUser);
    setUser(loggedInUser);
  }

  // logout: delete from LS + update all the components
  function logoutUser() {
    removeCurrentUser();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
