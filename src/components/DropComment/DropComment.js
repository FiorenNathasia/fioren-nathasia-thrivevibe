import React, { useState } from "react";
import commenticon from "../../assets/icons/chat-bubble.png";
import "./DropComment.scss";
import CommentInput from "../CommentInput/CommentInput";
import IconButton from "@mui/material/IconButton";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

function DropComment({ video }) {
  const [isDropped, setIsDropped] = useState(false);

  const handleButtonClick = () => {
    setIsDropped(!isDropped);
  };

  return (
    <div className="dropcomment">
      <div className="dropcomment__container">
        <div className="dropcomment__trigger">
          <div className="dropcomment__menu">
            <IconButton
              onClick={handleButtonClick}
              aria-label="comment"
              color="primary"
              sx={{
                position: "fixed",
                top: "96%",
                left: "93%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <AddCommentOutlinedIcon />
            </IconButton>
            {isDropped && (
              <div className="dropcomment__dropdown">
                <CommentInput videoId={video.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropComment;
