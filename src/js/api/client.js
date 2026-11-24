const BASE_URL = "http://localhost:3000";

// פונקציה שניגשת לשרת עם הנתיב והאפשרויות (סוג הבקשה והנתונים),
// ומחזירה את התשובה של השרת. אם יש בעיה - זורקת שגיאה עם הודעה ברורה.
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    // השרת בכלל לא ענה
    throw new Error("Could not connect to the server. Is it running?");
  }

  // השרת ענה, אבל הבקשה לא הצליחה
  if (!response.ok) {
    throw new Error(`The server returned an error (${response.status}).`);
  }
  return response.json();
}

// One generic function for ALL the resources: users, todos, posts, comments, albums, photos.
// resource = the name of the list on the server, e.g. "todos"
// action   = what to do, e.g. { type: "GET", filters: { userId: 1 } }
export function api(resource, action) {
  const resourcePath = `/${resource}`;

  switch (action.type) {
    case "GET":
      // filters become the query: { userId: 1, _limit: 5 } -> ?userId=1&_limit=5
      return request(`${resourcePath}?${new URLSearchParams(action.filters)}`);
    case "ADD":
      return request(resourcePath, { method: "POST", body: JSON.stringify(action.item) });
    case "UPDATE":
      return request(`${resourcePath}/${action.id}`, {
        method: "PATCH",
        body: JSON.stringify(action.changes),
      });
    case "DELETE":
      // json-server also deletes the items that belong to it (comments of a post, photos of an album)
      return request(`${resourcePath}/${action.id}`, { method: "DELETE" });
  }
}
