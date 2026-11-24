import { createContext } from "react";

// The logged-in user - shared with the WHOLE app.
// The value is given by UserProvider, and read with the hook useUser().
export const UserContext = createContext(null);
