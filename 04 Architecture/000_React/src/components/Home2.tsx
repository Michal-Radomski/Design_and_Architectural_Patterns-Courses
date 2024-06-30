import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/store";
import { decrement, increment, reset } from "../redux/counterSlice";

const Home2: React.FC = (): JSX.Element => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Home2;
