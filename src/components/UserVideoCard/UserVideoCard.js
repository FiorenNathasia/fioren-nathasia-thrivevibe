import "./UserVideoCard.scss";
import React from "react";
import YouTube from "react-youtube";

export default function UserVideoCard({ id, url, prompt }) {
  // Extract video ID from the YouTube URL
  const videoId = url.split("/").pop();
  const opts = {
    width: "75%",
    height: "200",
  };

  return (
    <div className="videocard">
      <YouTube className="videocard__video" videoId={videoId} opts={opts} />

      <p className="videocard__prompt">{prompt}</p>
    </div>
  );
}
