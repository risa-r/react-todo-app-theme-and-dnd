import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const DATA = [
  { id: 0, name: "grocery shopping", completed: true },
  { id: 1, name: "send a letter", completed: false },
  { id: 2, name: "order pizza", completed: false }
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);
