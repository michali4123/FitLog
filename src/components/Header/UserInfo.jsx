import "../../css/Header/UserInfo.css";

// A window on top of the page with the user's personal details.
// Clicking outside the window closes it.
export default function UserInfo({ user, onClose }) {
  // a click inside the window does not reach the backdrop, so it does not close it
  function keepWindowOpen(event) {
    event.stopPropagation();
  }

  return (
    <div className="user-info-backdrop" onClick={onClose}>
      <div className="user-info" onClick={keepWindowOpen}>
        <h2>{user.name}</h2>

        <dl>
          <dt>Username</dt>
          <dd>{user.username}</dd>

          <dt>Email</dt>
          <dd>{user.email}</dd>

          <dt>Phone</dt>
          <dd>{user.phone}</dd>

          <dt>Address</dt>
          <dd>
            {user.address.street}, {user.address.city} {user.address.zipcode}
          </dd>
        </dl>
      </div>
    </div>
  );
}
