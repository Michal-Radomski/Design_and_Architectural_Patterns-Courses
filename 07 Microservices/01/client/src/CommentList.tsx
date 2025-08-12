import React from "react";

import type { CommentByPostId } from "@common/CommonInterfaces";

const CommentList = ({ comments }: { comments: CommentByPostId[] }): JSX.Element => {
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
