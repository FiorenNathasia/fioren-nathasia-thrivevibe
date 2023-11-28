import "./UserVideoCard.scss";
import React from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export default function UserVideoCard({ id, url, prompt }) {
  const videoId = url.split("/").pop();

  return (
    <Link to={`/video/${id}`}>
      <Card
        sx={{
          width: "20rem",
          margin: "0.5rem",
          boxShadow: 3.5,
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        <CardActionArea
          sx={{
            padding: "1rem",
            height: "20rem",
          }}
        >
          <iframe
            width="75%"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{
              border: "none",
              borderRadius: "10px",
            }}
          />
          <CardContent>
            <p className="uservideocard__prompt">{prompt}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
