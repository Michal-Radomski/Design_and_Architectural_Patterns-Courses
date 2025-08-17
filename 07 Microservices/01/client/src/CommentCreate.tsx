import React from "react";
import axios from "axios";

const CommentCreate = ({ postId }: { postId: string }): JSX.Element => {
  const [content, setContent] = React.useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    // await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
    await axios.post(`http://post.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>New Comment</label>
            <input value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CommentCreate;
