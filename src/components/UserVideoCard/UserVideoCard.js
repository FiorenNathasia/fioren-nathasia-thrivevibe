import "./UserVideoCard.scss";
import React from "react";
import Card from "@mui/material/Card";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export default function UserVideoCard({ id, url, prompt }) {
  const videoId = url.split("/").pop();
  const opts = {
    width: "75%",
    height: "200",
  };

  return (
    <Link to={`/video/${id}`}>
      <Card
        sx={{
          width: "20rem",
          margin: "0.5rem",
          boxShadow: 3.5,
          borderRadius: "10px",
        }}
      >
        <CardActionArea
          sx={{
            padding: "1rem",
            height: "20rem",
          }}
        >
          <YouTube
            className="uservideocard__video"
            videoId={videoId}
            opts={opts}
          />
          <CardContent>
            <p className="uservideocard__prompt">{prompt}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
