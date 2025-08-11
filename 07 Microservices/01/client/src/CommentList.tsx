import React from "react";
import axios from "axios";

import type { CommentByPostId } from "@common/CommonInterfaces";

const CommentList = ({ postId }: { postId: string }): JSX.Element => {
  const [comments, setComments] = React.useState<CommentByPostId[]>([]);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

      setComments(res.data);
    };

    fetchData();
  }, [postId]);

  const renderedComments: JSX.Element[] = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <React.Fragment>
      <ul>{renderedComments}</ul>
    </React.Fragment>
  );
};

export default CommentList;
