import { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import FilterButtons from "./components/FilterButtons";

export default function App({ tasks }) {
  const [todos, setTodos] = useState(tasks);
  const [filter, setFilter] = useState("All");

  const filterButtons = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  };

  const filterNames = Object.keys(filterButtons);

  const taskList = todos
    .filter(filterButtons[filter])
    .map((todo) => (
      <Todo
        id={todo.id}
        name={todo.name}
        key={todo.id}
        completed={todo.completed}
        editTask={editTask}
        deleteTask={deleteTask}
        handleToggleCompleted={handleToggleCompleted}
      />
    ));

  const buttonsList = filterNames.map((name) => (
    <FilterButtons
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTodos([...todos, newTask]);
  }

  function editTask(id, newName) {
    const editedTasks = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: newName };
      } else {
        return todo;
      }
    });
    setTodos(editedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTasks);
  }

  function handleToggleCompleted(id) {
    const updatedTasks = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTasks);
  }

  function clearCompleted() {
    const activeTasks = todos.filter((todo) => !todo.completed);
    setTodos(activeTasks);
  }

  const activeTasksNumber = todos.filter(filterButtons["Active"]).length;

  return (
    <div className="wrapper">
      <header>
        <h1>TODO</h1>
        <button>
          ☾<span className="visually-hidden">switch to dark mode</span>
        </button>
      </header>
      <Form addTask={addTask} />
      <main className="todo-list-and-buttons-wrapper">
        <ul className="todo-list">{taskList}</ul>
        <aside className="buttons-wrapper">
          <div className="task-counter">{activeTasksNumber} items left</div>
          {buttonsList}
          <button onClick={clearCompleted}>
            Clear Completed<span className="visually-hidden"> tasks</span>
          </button>
        </aside>
      </main>
      <footer></footer>
    </div>
  );
}
