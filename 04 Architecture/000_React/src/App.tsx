import React from "react";

import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <h1>State Management in a React SPA</h1>

      <Home />
    </React.Fragment>
  );
};

export default App;
