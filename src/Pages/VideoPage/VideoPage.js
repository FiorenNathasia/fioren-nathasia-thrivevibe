import "./VideoPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import PieChart from "../../components/PieChart/PieChart";
function VideoPage() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  const fetchVideo = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:2222/api/video/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideo(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  if (failedAuth) {
    return <main className="dashboard">You must log in to see this page.</main>;
  }
  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  return (
    <div className="videopage">
      <div className="videopage__container">
        <VideoCard video={video} />
        <PieChart upvotes={video.upvote} downvotes={video.downvote} />
      </div>
    </div>
  );
}

export default VideoPage;
