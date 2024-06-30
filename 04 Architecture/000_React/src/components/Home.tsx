import React, { useContext } from "react";
import { AppContext } from "../state/AppContext";

const Home: React.FC = (): JSX.Element => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Home must be used within an AppProvider");
  }

  const { state, dispatch } = context;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};

export default Home;
