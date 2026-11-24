import { useState } from "react";
import UserInfo from "./UserInfo";

// The Info button: opens a window with the user's details.
export default function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);

  function openInfo() {
    setIsOpen(true);
  }

  function closeInfo() {
    setIsOpen(false);
  }

  return (
    <>
      <button type="button" onClick={openInfo}>Info</button>
      {isOpen && <UserInfo onClose={closeInfo} />}
    </>
  );
}
