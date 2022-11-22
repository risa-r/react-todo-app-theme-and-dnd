import { useState } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      return;
    }
    addTask(name);
    setName("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label id="todoInput"></label>
      <input
        className="add-task-input"
        type="text"
        placeholder="new task"
        name="todoInput"
        value={name}
        onChange={handleChange}
      ></input>
      <button className="add-button" type="submit">
        Add<span className="visually-hidden"> task</span>
      </button>
    </form>
  );
}
