import { useState, useRef, useEffect } from "react";
import Form from "./components/Form/Form";
import Todo from "./components/Todo/Todo";
import { nanoid } from "nanoid";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import useLocalStorage from "use-local-storage";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import usePrevious from "./components/UsePrevious";
import "./App.scoped.css";

export default function App({ tasks }) {
  const [todos, setTodos] = useState(tasks);
  const [filter, setFilter] = useState("All");
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const filterButtons = {
    All: () => true,
    Active: todo => !todo.completed,
    Completed: todo => todo.completed
  };

  const filterNames = Object.keys(filterButtons);

  const taskList = todos
    .filter(filterButtons[filter])
    .map(todo => (
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

  const buttonsList = filterNames.map(name => (
    <FilterButtons
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTodos([...todos, newTask]);
  }

  function editTask(id, newName) {
    const editedTasks = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, name: newName };
      } else {
        return todo;
      }
    });
    setTodos(editedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = todos.filter(todo => todo.id !== id);
    setTodos(remainingTasks);
  }

  function handleToggleCompleted(id) {
    const updatedTasks = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTasks);
  }

  function clearCompleted() {
    const activeTasks = todos.filter(todo => !todo.completed);
    setTodos(activeTasks);
  }

  const taskCounterTextRef = useRef(null);
  const activeTasksNumber = todos.filter(filterButtons["Active"]).length;
  const itemsNoun = activeTasksNumber > 1 ? "items" : "item";
  const prevTodosLength = usePrevious(todos.length);

  useEffect(() => {
    if (prevTodosLength - todos.length === 1) {
      taskCounterTextRef.current.focus(); //This focus is not working
    }
  }, [todos.length, prevTodosLength]);

  return (
    <div className="App" data-theme={theme}>
      <div className="wrapper">
        <header>
          <h1>TODO</h1>
          <button
            onClick={() => {
              switchTheme();
              console.log(theme);
            }}
          >
            {theme === "dark" ? (
              <BsSunFill className="theme-btn" />
            ) : (
              <BsMoonFill className="theme-btn" />
            )}
            <span className="visually-hidden">
              Switch to {theme === "light" ? "dark" : "light"} theme
            </span>
          </button>
        </header>
        <Form addTask={addTask} />
        <main className="todo-list-and-buttons-wrapper">
          <ul className="todo-list">{taskList}</ul>
          <aside className="buttons-wrapper">
            <p className="task-counter" tabIndex="-1" ref={taskCounterTextRef}>
              {activeTasksNumber} {itemsNoun} left
            </p>
            <div className="filter-button-wrapper">{buttonsList}</div>
            <button className="clear-completed-btn" onClick={clearCompleted}>
              Clear Completed<span className="visually-hidden"> tasks</span>
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
}
