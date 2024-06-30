import React, { useContext } from "react";

import { AppContext } from "../state/AppContext";

const Header: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Header must be used within an AppProvider");
  }

  const { state } = context;

  return (
    <header>
      <nav>
        <p>Current count: {state.count}</p>
      </nav>
    </header>
  );
};

export default Header;
