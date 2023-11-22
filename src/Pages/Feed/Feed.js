import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Feed.scss";
import axios from "axios";

function Feed() {
  const [videoList, setVideoList] = useState(null);

  const [isError, setIsError] = useState(false);
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
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, videoId) => {
    console.log("removing: " + videoId);
    setLastDirection(direction);
  };

  const outOfFrame = (videoId) => {
    console.log(videoId + " left the screen!");
  };

  const handleVote = (videoId, liked) => {
    // You can send the vote to your server here
    console.log(`${liked ? "Liked" : "Disliked"} video: ${videoId}`);
  };

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="feed">
      <div className="swipe__info">
        {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
      </div>
      <div className="feed__swipecontainer">
        <div className="feed__cardcontainer">
          {videoList &&
            videoList.map((video) => (
              <TinderCard
                className="swipe"
                key={video.url}
                onSwipe={(dir) => swiped(dir, video.url)}
                onCardLeftScreen={() => outOfFrame(video.url)}
              >
                <div className="card">
                  {" "}
                  <YouTube
                    className="videocard__video"
                    videoId={video.url.split("/").pop()}
                    opts={opts}
                  />
                  <h3>{video.prompt}</h3>
                  <div className="voting-buttons">
                    <button onClick={() => handleVote(video.url, true)}>
                      Like
                    </button>
                    <button onClick={() => handleVote(video.url, false)}>
                      Dislike
                    </button>
                  </div>
                </div>
              </TinderCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
