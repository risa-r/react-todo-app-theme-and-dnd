export default function Form() {
  return (
    <form>
      <label id="todoInput"></label>
      <input type="text" placeholder="new task" name="todoInput"></input>
      <button>Add task</button>
    </form>
  );
}
