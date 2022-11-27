import "./filterButtons.scoped.css";

export default function FilterButtons({ name, isPressed, setFilter }) {
  return (
    <button
      className="filter-buttons"
      type="button"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span
        style={{
          color: isPressed ? "hsl(220, 98%, 61%)" : "var(--button-text-color"
        }}
      >
        {name}
      </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
