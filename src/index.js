import React from "react";
import ReactDOM from "react-dom";
import Parser from "./parser";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Parser</h1>
      <Parser />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
