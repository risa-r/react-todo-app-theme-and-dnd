import { useContext, useState } from "react";

export default function FilterButtons({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      {name}
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
