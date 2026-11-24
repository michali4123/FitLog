import { api } from "../api/client";

// All the work of login / register against the server.
// Saving the logged-in user (LS + state) happens in UserContext.

// Returns the user with this username, or undefined if there is no such user.
async function findUser(username) {
  const matchingUsers = await api("users", { type: "GET", filters: { username } });
  return matchingUsers[0];
}

// Returns the user if the username + password are correct, otherwise throws an error.
export async function login(username, password) {
  const user = await findUser(username);
  if (!user || user.password !== password) {
    throw new Error("Wrong username or password.");
  }
  return user;
}

// true if there is already a user with this username on the server.
export async function isUsernameTaken(username) {
  const user = await findUser(username);
  return user !== undefined;
}

// Saves a new user on the server and returns it.
// account = { username, password }, details = the fields of the details form (already trimmed)
export async function register(account, details) {
  return api("users", {
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
}
