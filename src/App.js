import { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App({ tasks }) {
  const [todos, setTodos] = useState(tasks);

  const taskList = todos.map((todo) => (
    <Todo id={todo.id} name={todo.name} completed={todo.completed} />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nextId++}`, name: name, completed: false };
    setTodos([...todos, newTask]);
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

let nextId = 3;
