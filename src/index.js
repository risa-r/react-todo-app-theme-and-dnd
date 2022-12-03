import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const DATA = [
  { id: 1, name: "grocery shopping", completed: true },
  { id: 2, name: "send a letter", completed: false },
  { id: 3, name: "order pizza", completed: false }
];
// The id given to the useSortable hook cannot be 0, so the ids start from 1

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
