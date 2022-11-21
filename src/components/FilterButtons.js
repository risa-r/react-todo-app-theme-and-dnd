import { useContext } from "react";
import { FilterButtonsContext } from "./FilterButtonsContext";

export default function FilterButtons() {
  const filterButtons = useContext(FilterButtonsContext);
  const filterNames = Object.keys(filterButtons);

  const buttonsList = filterNames.map((btn) => {
    return (
      <button key={btn}>
        <span className="visually-hidden">show </span>
        {btn}
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  });

  return <div>{buttonsList}</div>;
}
