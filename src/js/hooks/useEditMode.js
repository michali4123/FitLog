import { useState } from "react";

// Generic hook for one item that can be edited (task, photo, post, comment).
// onUpdate(itemId, changes) saves on the server and returns true if it succeeded.
export function useEditMode(itemId, onUpdate) {
  const [isEditing, setIsEditing] = useState(false);

  function startEditing() {
    setIsEditing(true);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  // closes the edit form only if the server saved the changes
  async function saveChanges(changes) {
    const isSaved = await onUpdate(itemId, changes);
    if (isSaved) stopEditing();
    return isSaved;
  }

  return { isEditing, startEditing, stopEditing, saveChanges };
}
