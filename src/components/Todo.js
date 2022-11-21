export default function Todo({ id, name, completed }) {
  return (
    <li key={id}>
      <input type="checkbox" checked={completed} />
      <label>{name}</label>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
}
