import React from "react";

import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Home2 from "./components/Home2";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <h1>State Management in a React SPA</h1>
      <h3>React Hooks</h3>
      <Home />

      <h3>Redux</h3>
      <Home2 />
    </React.Fragment>
  );
};

export default App;
