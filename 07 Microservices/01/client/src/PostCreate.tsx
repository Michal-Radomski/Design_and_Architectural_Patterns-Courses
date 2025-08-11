import React from "react";
import axios from "axios";

const PostCreate = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PostCreate;
