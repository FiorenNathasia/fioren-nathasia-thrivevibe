import TinderCard from "react-tinder-card";
import { useState } from "react";
import YouTube from "react-youtube";
import "./Feed.scss";

function Feed() {
  const videos = [
    {
      prompt: "Did you like the composition of the video?",
      url: "https://youtube.com/shorts/vH7g8KRsbMo?si=6A1BuHPsD3EuIra2",
    },
    {
      prompt: "Did you like the composition of the video?",
      url: "https://youtube.com/shorts/vH7g8KRsbMo?si=6A1BuHPsD3EuIra2",
    },
    {
      prompt: "Did you like the composition of the video?",
      url: "https://youtube.com/shorts/vH7g8KRsbMo?si=6A1BuHPsD3EuIra2",
    },
    {
      prompt: "Did you like the composition of the video?",
      url: "https://youtube.com/shorts/vH7g8KRsbMo?si=6A1BuHPsD3EuIra2",
    },
    {
      prompt: "Did you like the composition of the video?",
      url: "https://youtube.com/shorts/vH7g8KRsbMo?si=6A1BuHPsD3EuIra2",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, videoId) => {
    console.log("removing: " + videoId);
    setLastDirection(direction);
  };

  const outOfFrame = (videoId) => {
    console.log(videoId + " left the screen!");
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="feed">
      <div className="feed__swipecontainer">
        <div className="feed__cardcontainer">
          {videos.map((video) => (
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
              </div>
            </TinderCard>
          ))}
          <div className="swipe__info">
            {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
