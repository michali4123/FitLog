// All the fields of all the forms, and the options of the search bars - in one place.
// A field: { name, label?, placeholder?, type?, isMultiline?, rows? }

// ---------- forms ----------
export const TODO_FIELDS = [{ name: "title", placeholder: "New workout, e.g. Run 5 km..." }];

export const ALBUM_FIELDS = [{ name: "title", placeholder: "Album name..." }];

export const PHOTO_FIELDS = [
  { name: "title", placeholder: "What's in the photo..." },
  { name: "url", placeholder: "Image URL..." },
];

export const POST_FIELDS = [
  { name: "title", label: "Title" },
  { name: "body", label: "Content", isMultiline: true, rows: 6 },
];

export const COMMENT_FIELDS = [
  { name: "name", placeholder: "Title..." },
  { name: "body", placeholder: "Write your comment...", isMultiline: true, rows: 3 },
];

export const LOGIN_FIELDS = [
  { name: "username", label: "Username" },
  { name: "password", label: "Password", type: "password" },
];

export const REGISTER_FIELDS = [
  ...LOGIN_FIELDS,
  { name: "verifyPassword", label: "Verify password", type: "password" },
];

export const PROFILE_FIELDS = [
  { name: "name", label: "Full name" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "street", label: "Street" },
  { name: "city", label: "City" },
  { name: "zipcode", label: "Zipcode" },
];

// ---------- search bars ----------
// a search option with "choices" shows a select instead of a text box
export const ID_TITLE_SEARCH_OPTIONS = [
  { value: "id", label: "ID" },
  { value: "title", label: "Title" },
];

export const TODO_SEARCH_OPTIONS = [
  ...ID_TITLE_SEARCH_OPTIONS,
  {
    value: "completed",
    label: "Status",
    choices: [
      { value: "", label: "All" },
      { value: "true", label: "Done" },
      { value: "false", label: "Not done" },
    ],
  },
];

export const TODO_SORT_OPTIONS = [
  { value: "id", label: "ID" },
  { value: "title", label: "Title" },
  { value: "completed", label: "Status" },
];
