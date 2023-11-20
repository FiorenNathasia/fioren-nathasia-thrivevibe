import "./UserVideoList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVideoCard from "../UserVideoCard/UserVideoCard";

export default function UserVideoList({ videos }) {
  return (
    <>
      <div className="videolist">
        {videos.map((video) => (
          <UserVideoCard key={video.id} url={video.url} prompt={video.prompt} />
        ))}
      </div>
    </>
  );
}
