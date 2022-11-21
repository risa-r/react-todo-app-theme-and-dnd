import { useState } from "react";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  deleteTask,
  handleToggleCompleted,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);

  function handleChange(e) {
    setTaskName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, taskName);
    setTaskName("");
    setIsEditing(false);
  }

  const editTemplate = (
    <form onSubmit={handleSubmit}>
      <input type="text" value={taskName} onChange={handleChange}></input>
      <label>
        <span className="visually-hidden">edit the task name of '{name}'</span>
      </label>
      <button type="submit">Save</button>
    </form>
  );

  const viewTemplate = (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleToggleCompleted(id)}
      />
      <label>{name}</label>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteTask(id)}>Delete</button>
    </>
  );

  return <li key={id}>{isEditing ? editTemplate : viewTemplate}</li>;
}
