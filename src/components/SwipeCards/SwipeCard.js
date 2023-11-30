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
    }, 1500);
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
      <div className="feed__info">
        {lastDirectionRef.current ? (
          <p
            style={{
              color:
                swipeDirection === "right"
                  ? "#4CAF50"
                  : swipeDirection === "left"
                  ? "#D32F2F"
                  : "black",
            }}
          >
            You Swiped {lastDirectionRef.current}!
          </p>
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
            videoList.map((video, index) => (
              <TinderCard
                className={`swipe ${index === 0 ? "first-card" : ""} `}
                key={video.id}
                onSwipe={(dir) => swiped(dir, video.id)}
                onCardLeftScreen={() => outOfFrame(video.id)}
              >
                <div className="feed__cardshadow">
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
