import TinderCard from "react-tinder-card";
import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import "./SwipeCard.scss";
import axios from "axios";
import DropComment from "../DropComment/DropComment";

function SwipeCard() {
  const [videoList, setVideoList] = useState(null);
  const [isError, setIsError] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const lastDirectionRef = useRef();

  const fetchVideoList = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:2222/api/feed/feedlist",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideoList(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  const swiped = (direction, videoId) => {
    console.log("removing: " + videoId);
    lastDirectionRef.current = direction;
    setSwipeDirection(direction);
  };

  const outOfFrame = async (videoId) => {
    console.log(videoId + " left the screen!");

    const lastDirection = lastDirectionRef.current;

    if (lastDirection === "right") {
      try {
        const token = sessionStorage.getItem("token");
        await axios.put(
          `http://localhost:2222/api/video/${videoId}/vote`,
          { voteType: "upvote" },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("Upvoting video:", videoId);
      } catch (error) {
        console.error("Error while upvoting:", error);
      }
    } else if (lastDirection === "left") {
      try {
        const token = sessionStorage.getItem("token");
        await axios.put(
          `http://localhost:2222/api/video/${videoId}/vote`,
          { voteType: "downvote" },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("Downvoting video:", videoId);
      } catch (error) {
        console.error("Error while downvoting:", error);
      }
    }
  };

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <div className="swipe__info">
        {lastDirectionRef.current ? (
          <p>You Swiped {lastDirectionRef.current}</p>
        ) : (
          <p />
        )}
      </div>
      <div className="feed__cardcontainer">
        {videoList &&
          videoList.map((video) => (
            <TinderCard
              className="swipe"
              key={video.id}
              onSwipe={(dir) => swiped(dir, video.id)}
              onCardLeftScreen={() => outOfFrame(video.id)}
            >
              <div className="card">
                {" "}
                <YouTube
                  className="videocard__video"
                  videoId={video.url.split("/").pop()}
                  opts={opts}
                />
                <h3>{video.prompt}</h3>
                <DropComment />
              </div>
            </TinderCard>
          ))}
        <div className="voting-buttons"></div>
      </div>
    </>
  );
}
export default SwipeCard;
