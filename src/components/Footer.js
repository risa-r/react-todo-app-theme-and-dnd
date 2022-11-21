import FilterButtons from "./FilterButtons";

export default function Footer({ buttonsList }) {
  return (
    <>
      <div>tasks left</div>
      {buttonsList}
      <button>Clear Completed</button>
    </>
  );
}
