import React, { useState } from "react";
import axios from "axios";
import "./CommentInput.scss";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import IconButton from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

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
        <TextField
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
          multiline
          rows={4}
          sx={{
            width: "21.3rem",
            height: "0.5rem",
            right: "1.2rem",
            top: "-0.8rem",
            borderColor: "#4654a3",
          }}
        />
        <div className="commentinput__button--wrapper">
          <IconButton
            onClick={handleSubmit}
            aria-label="comment"
            color="primary"
            startIcon={<SendIcon />}
            sx={{
              position: "fixed",
              top: "96%",
              left: "85%",
              transform: "translate(-50%, -50%)",
              color: "#4654a3",
              width: "1rem",
              display: "flex",
              flexDirection: "center",
            }}
          ></IconButton>
        </div>
        {error && <div className="commentinput__message">{error}</div>}
      </form>
    </div>
  );
}

export default CommentInput;
