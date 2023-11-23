import "./VideoCard.scss";
import YouTube from "react-youtube";

function VideoCard({ video }) {
  const videoId = video.url.split("/").pop();
  const opts = {
    width: "75%",
    height: "200",
  };

  return (
    <div className="videocard">
      <YouTube className="videocard__video" videoId={videoId} opts={opts} />
      <p className="videocard__prompt">{video.prompt}</p>
    </div>
  );
}

export default VideoCard;
