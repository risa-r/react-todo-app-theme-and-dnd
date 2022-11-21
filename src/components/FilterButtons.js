export default function FilterButtons() {
  return (
    <>
      <button>
        <span className="visually-hidden">show </span>All
        <span className="visually-hidden"> tasks</span>
      </button>
      <button>
        <span className="visually-hidden">show </span>Active
        <span className="visually-hidden"> tasks</span>
      </button>
      <button>
        <span className="visually-hidden">show </span>Completed
        <span className="visually-hidden"> tasks</span>
      </button>
    </>
  );
}
