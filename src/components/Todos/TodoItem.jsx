import { useEditMode } from "../../js/hooks/useEditMode";
import { TODO_FIELDS } from "../../js/config/fields";
import ItemRow from "../common/ItemRow";
import ItemForm from "../common/ItemForm";
import ItemActions from "../common/ItemActions";
import "../../css/Todos/TodoItem.css";

// One task row: id, checkbox, title, and the buttons.
// While editing, the title becomes a form (Enter saves, Escape cancels).
export default function TodoItem({ todo, onUpdate, onDelete }) {
  const editMode = useEditMode(todo.id, onUpdate);

  function toggleCompleted(event) {
    onUpdate(todo.id, { completed: event.target.checked });
  }

  function deleteTodo() {
    onDelete(todo.id);
  }

  const titleElement = editMode.isEditing ? (
    <ItemForm
      fields={TODO_FIELDS}
      initialValues={todo}
      submitText="Save"
      onSubmit={editMode.saveChanges}
      onCancel={editMode.stopEditing}
      autoFocus
      className="inline-form grow"
    />
  ) : (
    <span className="item-title">{todo.title}</span>
  );

  return (
    <li className={`item-card ${todo.completed ? "done" : ""}`}>
      <ItemRow itemId={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleCompleted}
          aria-label="Done"
        />
        {titleElement}
        {!editMode.isEditing && <ItemActions onEdit={editMode.startEditing} onDelete={deleteTodo} />}
      </ItemRow>
    </li>
  );
}
