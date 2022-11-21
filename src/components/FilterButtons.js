import { useContext, useState } from "react";

export default function FilterButtons({ name }) {
  return (
    <button type="button">
      <span className="visually-hidden">Show </span>
      {name}
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
