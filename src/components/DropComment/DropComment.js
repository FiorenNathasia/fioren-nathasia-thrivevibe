import React, { useState } from "react";
import commenticon from "../../assets/icons/chat-bubble.png";
import "./DropComment.scss"; // Import your SCSS file

function DropComment() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dropcomment">
      <div className="dropcomment__container">
        <div className="dropcomment__trigger">
          <div className="dropcomment__menu">
            <button className="dropcomment__icon" onClick={handleButtonClick}>
              <img src={commenticon} alt="Comment Icon" />
            </button>
            {isMenuOpen && (
              <div className="dropcomment__dropdown">
                <p>Dropdown Content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropComment;
