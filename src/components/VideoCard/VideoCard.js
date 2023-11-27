import "./VideoCard.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

function VideoCard({ video }) {
  const videoId = video.url.split("/").pop();

  return (
    <Card
      sx={{
        width: "30rem",
        height: "40rem",
        margin: "0.5rem",
        boxShadow: 4,
        margin: "2rem 0 0 0",
        borderRadius: "10px",
      }}
    >
      <CardActionArea
        sx={{
          padding: "1rem",
          height: "40rem",
        }}
      >
        <iframe
          width="80%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          style={{
            border: "none",
            borderRadius: "10px",
          }}
        />
        <CardContent>
          <p className="videocard__prompt">{video.prompt}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default VideoCard;
