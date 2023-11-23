import "./UserVideoCard.scss";
import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

export default function UserVideoCard({ id, url, prompt }) {
  const videoId = url.split("/").pop();
  const opts = {
    width: "75%",
    height: "200",
  };

  return (
    <Link to={`/video/${id}`}>
      <div className="uservideocard">
        <YouTube
          className="uservideocard__video"
          videoId={videoId}
          opts={opts}
        />
        <p className="uservideocard__prompt">{prompt}</p>
      </div>
    </Link>
  );
}
