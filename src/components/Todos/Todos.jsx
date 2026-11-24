import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useServerList } from "../../js/hooks/useServerList";
import { useSearch } from "../../js/hooks/useSearch";
import { TODO_FIELDS, TODO_SEARCH_OPTIONS, TODO_SORT_OPTIONS } from "../../js/config/fields";
import SearchBar from "../common/SearchBar";
import OptionsSelect from "../common/OptionsSelect";
import ItemForm from "../common/ItemForm";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "../common/ListView";
import TodoItem from "./TodoItem";
import "../../css/Todos/Todos.css";

// Returns a new sorted array by the chosen key (id / title / completed).
// For true/false: "not done" comes first.
function sortTodos(todos, sortKey) {
  return [...todos].sort((firstTodo, secondTodo) => {
    if (sortKey === "title") return firstTodo.title.localeCompare(secondTodo.title);
    return Number(firstTodo[sortKey]) - Number(secondTodo[sortKey]);
  });
}

// Main tasks page: loads the tasks of the logged-in user only.
export default function Todos() {
  const { id: userId } = useOutletContext(); // the logged-in user, from UserPage
  const todos = useServerList("todos", { userId }, "workout");
  const search = useSearch(todos.items, "title");
  const [sortKey, setSortKey] = useState("id");

  const visibleTodos = sortTodos(search.results, sortKey);

  function addTodo(newTodoValues) {
    return todos.addItem({ userId, title: newTodoValues.title, completed: false });
  }

  function renderTodo(todo) {
    return (
      <TodoItem key={todo.id} todo={todo} onUpdate={todos.updateItem} onDelete={todos.deleteItem} />
    );
  }

  return (
    <section className="page">
      <h2>My Workouts</h2>

      <div className="card toolbar">
        <SearchBar search={search} searchOptions={TODO_SEARCH_OPTIONS} />
        <label className="sort-select">
          Sort by:
          <OptionsSelect
            options={TODO_SORT_OPTIONS}
            value={sortKey}
            onChange={setSortKey}
            label="Sort by"
          />
        </label>
        <ItemForm fields={TODO_FIELDS} submitText="Add" onSubmit={addTodo} className="inline-form" />
      </div>

      <ErrorMessage message={todos.errorMessage} />

      <ListView
        items={visibleTodos}
        isLoading={todos.isLoading}
        emptyText="No workouts found."
        renderItem={renderTodo}
      />
    </section>
  );
}
