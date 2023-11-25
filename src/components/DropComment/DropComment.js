import React, { useState } from "react";
import commenticon from "../../assets/icons/chat-bubble.png";
import "./DropComment.scss";
import CommentInput from "../CommentInput/CommentInput";

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
            <button className="dropcomment__icon" onClick={handleButtonClick}>
              <img className="img" src={commenticon} alt="Comment Icon" />
            </button>
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
