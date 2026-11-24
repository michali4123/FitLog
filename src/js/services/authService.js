import { api } from "../api/client";
import { saveCurrentUser, removeCurrentUser } from "../storage/currentUser";

// All the work of login / register / logout against the server and LS.
// The components only show the forms and call these functions.

// Returns the user with this username, or undefined if there is no such user.
async function findUser(username) {
  const matchingUsers = await api("users", { type: "GET", filters: { username } });
  return matchingUsers[0];
}

// Returns the user if the username + password are correct, otherwise throws an error.
// A user that logged in is saved in LS.
export async function login(username, password) {
  const user = await findUser(username);
  if (!user || user.password !== password) {
    throw new Error("Wrong username or password.");
  }

  saveCurrentUser(user);
  return user;
}

// true if there is already a user with this username on the server.
export async function isUsernameTaken(username) {
  const user = await findUser(username);
  return user !== undefined;
}

// Saves a new user on the server and logs him in (saves in LS).
// account = { username, password }, details = the fields of the details form (already trimmed)
export async function register(account, details) {
  const newUser = await api("users", {
    type: "ADD",
    item: {
      username: account.username,
      password: account.password,
      name: details.name,
      email: details.email,
      phone: details.phone,
      address: {
        street: details.street,
        city: details.city,
        zipcode: details.zipcode,
      },
    },
  });

  saveCurrentUser(newUser);
  return newUser;
}

export function logout() {
  removeCurrentUser();
}
