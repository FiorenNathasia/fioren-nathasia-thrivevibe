import "./UserVideoList.scss";
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
