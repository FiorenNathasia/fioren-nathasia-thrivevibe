import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserVideoList from "../../components/UserVideoList/UserVideoList";
import NewVideoModal from "../../components/NewVideoModal/NewVideoModal";

function Dashboard() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const { videoId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchVideoList = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:2222/api/video", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setVideoList(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUsername = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:2222/api/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      setIsError(true);
    }
  };

  const fetchPageData = async () => {
    await fetchVideoList();
    await fetchUsername();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  if (failedAuth) {
    return <main className="dashboard">You must log in to see this page.</main>;
  }

  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  return (
    <main className="dashboard">
      <div className="dashboard__container">
        <h1>My Profile</h1>
        <p className="dashboard__title">
          Welcome back {user.username},{" "}
          <button onClick={logout}>Log out</button>{" "}
        </p>
        <h2>Your Videos</h2>
        <div className="dashboard__videolist">
          {videoList && <UserVideoList videos={videoList} />}
        </div>

        <button
          alt="icon"
          className="dashboard__voucher"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add New Feature
        </button>
        {openModal && (
          <NewVideoModal
            closeModal={setOpenModal}
            fetchVideoList={fetchVideoList}
          />
        )}
      </div>
    </main>
  );
}

export default Dashboard;
