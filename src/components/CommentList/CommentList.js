import React from "react";
import "./CommentList.scss";

function CommentList({ comments }) {
  return (
    <div className="commentlist">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li>
            {" "}
            <p key={comment.id} className="commentlist__text">
              {comment.comments}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
