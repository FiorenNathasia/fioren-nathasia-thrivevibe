import "./Feed.scss";
import SwipeCard from "../../components/SwipeCards/SwipeCard";
import Header from "../../components/Header/Header";

function Feed() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <div>You must be logged in.</div>;
  }

  return (
    <>
      <Header />
      <div className="feed">
        <div className="feed__swipecontainer">
          <SwipeCard />
        </div>
      </div>
    </>
  );
}

export default Feed;
