import React from "react";

import type { CommentByPostId } from "@common/CommonInterfaces";

const CommentList = ({ comments }: { comments: CommentByPostId[] }): JSX.Element => {
  const renderedComments: JSX.Element[] = comments.map((comment: CommentByPostId) => {
    let content!: string;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return (
    <React.Fragment>
      <ul>{renderedComments}</ul>
    </React.Fragment>
  );
};

export default CommentList;
