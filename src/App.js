import { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import Footer from "./components/Footer";
import { nanoid } from "nanoid";

export default function App({ tasks }) {
  const [todos, setTodos] = useState(tasks);

  const taskList = todos.map((todo) => (
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

  return (
    <>
      <h1>TODO</h1>
      <span className="visually-hidden">
        <button>switch to dark mode</button>
      </span>
      <Form addTask={addTask} />
      <ul className="todo-list">{taskList}</ul>
      <Footer />
    </>
  );
}
