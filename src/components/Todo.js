export default function Todo({ tasks }) {
  const taskList = tasks.map((task) => {
    return (
      <li key={task.id}>
        <input type="checkbox" />
        {task.name}
      </li>
    );
  });

  return <div>{taskList}</div>;
}
