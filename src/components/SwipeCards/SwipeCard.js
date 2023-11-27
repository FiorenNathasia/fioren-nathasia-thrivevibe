import TinderCard from "react-tinder-card";
import { useEffect, useState, useRef } from "react";
import "./SwipeCard.scss";
import axios from "axios";
import DropComment from "../DropComment/DropComment";
import Lottie from "lottie-react";
import checkAnimation from "../../assets/animations/checkmark.json";
import crossAnimation from "../../assets/animations/crossmark.json";

function SwipeCard() {
  const [videoList, setVideoList] = useState(null);
  const [isError, setIsError] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

    if (direction === "right") {
      setIsAnimating("check");
    } else if (direction === "left") {
      setIsAnimating("cross");
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
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

  return (
    <>
      <div className="swipe__info">
        {lastDirectionRef.current ? (
          <p>You Swiped {lastDirectionRef.current}</p>
        ) : (
          <p />
        )}
      </div>{" "}
      <div className="feed__wrapper">
        <div className="feed__cross">
          {isAnimating === "cross" && <Lottie animationData={crossAnimation} />}
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
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${video.url
                      .split("/")
                      .pop()}`}
                    style={{
                      border: "none",
                      borderRadius: "10px",
                    }}
                  />
                  <h3>{video.prompt}</h3>
                  <DropComment video={video} />
                </div>
              </TinderCard>
            ))}
        </div>
        <div className="feed__check">
          {isAnimating === "check" && <Lottie animationData={checkAnimation} />}
        </div>
      </div>
    </>
  );
}
export default SwipeCard;
