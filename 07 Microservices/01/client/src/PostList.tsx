import React from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import type { Post } from "@common/CommonInterfaces";

const PostList = (): JSX.Element => {
  const [posts, setPosts] = React.useState<{ [id: string]: Post }>({});

  const fetchPosts = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts: JSX.Element[] = Object.values(posts).map((post: Post) => {
    return (
      <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};

export default PostList;
