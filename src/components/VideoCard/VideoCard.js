import "./VideoCard.scss";
import YouTube from "react-youtube";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

function VideoCard({ video }) {
  const videoId = video.url.split("/").pop();
  const opts = {
    width: "80%",
    height: "500",
  };

  return (
    // <div className="videocard">
    //   <YouTube className="videocard__video" videoId={videoId} opts={opts} />
    //   <p className="videocard__prompt">{video.prompt}</p>
    // </div>

    <Card
      sx={{
        width: "30rem",
        margin: "0.5rem",
        boxShadow: 4,
        margin: "2rem 0 0 0",
        borderRadius: "10px",
      }}
    >
      <CardActionArea
        sx={{
          padding: "1rem",
          height: "45rem",
        }}
      >
        <YouTube className="videocard__video" videoId={videoId} opts={opts} />
        <CardContent>
          <p className="videocard__prompt">{video.prompt}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VideoCard;
