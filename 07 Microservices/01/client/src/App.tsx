import React from "react";

import "./App.scss";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </React.Fragment>
  );
};

export default App;
