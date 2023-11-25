import React, { useState } from "react";
import axios from "axios";
import "./CommentInput.scss";

function CommentInput({ videoId }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `http://localhost:2222/api/video/${videoId}/comment`,
        {
          comments: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("Comment submitted successfully");
      setComment("");
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to post comment");
    }
  };

  return (
    <div className="commentinput">
      <form className="commentinput__form" onSubmit={handleSubmit}>
        <h1 className="commentinput__title">Submit a Comment</h1>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
          className="commentinput__textarea"
        />
        <div className="commentinput__button--wrapper">
          <button type="submit" className="commentinput__submit">
            Submit
          </button>
        </div>
        {error && <div className="commentinput__message">{error}</div>}
      </form>
    </div>
  );
}

export default CommentInput;
