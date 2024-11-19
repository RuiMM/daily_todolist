import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/variables.css";

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
