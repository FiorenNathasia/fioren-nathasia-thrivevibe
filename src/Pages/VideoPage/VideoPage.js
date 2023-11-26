import "./VideoPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import Analytics from "../../components/Analytics/Analytics";
import CommentList from "../../components/CommentList/CommentList";
import Header from "../../components/Header/Header";

function VideoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const videoResponse = await axios.get(
        `http://localhost:2222/api/video/${id}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const commentsResponse = await axios.get(
        `http://localhost:2222/api/video/${id}/comments`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideo(videoResponse.data);
      setComments(commentsResponse.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) {
    return <main className="dashboard">Could not load video page.</main>;
  }

  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  return (
    <>
      <Header />
      <div className="videopage">
        <div className="videopage__container">
          <VideoCard video={video} />
          <div className="videopage__info">
            <Analytics upvotes={video.upvote} downvotes={video.downvote} />
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
