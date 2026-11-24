import { useState } from "react";
import { useEditMode } from "../../js/hooks/useEditMode";
import { PHOTO_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";
import ItemActions from "../common/ItemActions";
import "../../css/Photos/PhotoItem.css";

// One photo: the image and its title.
// Clicking the image shows the buttons (edit / delete).
export default function PhotoItem({ photo, onUpdate, onDelete }) {
  const [isSelected, setIsSelected] = useState(false);
  const editMode = useEditMode(photo.id, onUpdate);

  function toggleSelected() {
    setIsSelected(!isSelected);
  }

  function deletePhoto() {
    onDelete(photo.id);
  }

  const detailsElement = editMode.isEditing ? (
    <ItemForm
      fields={PHOTO_FIELDS}
      initialValues={photo}
      submitText="Save"
      onSubmit={editMode.saveChanges}
      onCancel={editMode.stopEditing}
    />
  ) : (
    <span className="photo-title">{photo.title}</span>
  );

  const showActions = isSelected && !editMode.isEditing;

  return (
    <li className={`photo-item ${isSelected ? "selected" : ""}`}>
      <div className="photo-frame">
        <img src={photo.thumbnailUrl} alt={photo.title} onClick={toggleSelected} />
      </div>
      {detailsElement}
      {showActions && <ItemActions onEdit={editMode.startEditing} onDelete={deletePhoto} />}
    </li>
  );
}
