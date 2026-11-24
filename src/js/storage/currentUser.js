// Saves the logged-in user in Local Storage (LS) - with ALL his details.
// Only ONE user is saved - the current one.
const CURRENTUSER = "currentUser";

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENTUSER, JSON.stringify(user));
}

// Returns the logged-in user, or null if nobody is logged in.
export function getCurrentUser() {
  const saved = localStorage.getItem(CURRENTUSER);
  return saved ? JSON.parse(saved) : null;
}

export function removeCurrentUser() {
  localStorage.removeItem(CURRENTUSER);
}
