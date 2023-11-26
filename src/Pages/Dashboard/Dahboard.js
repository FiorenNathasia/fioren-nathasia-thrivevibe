import "./Dashboard.scss";
import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVideoList from "../../components/UserVideoList/UserVideoList";
import NewVideoModal from "../../components/NewVideoModal/NewVideoModal";
import Header from "../../components/Header/Header";
import Button from "@mui/material/Button";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
    navigate("/");
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

  if (isError) {
    return <main className="dashboard">Cannot display dashboard</main>;
  }

  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Header />
      <main className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__top">
            <h1>My Profile</h1>

            <p className="dashboard__welcome">Welcome back, </p>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#4654a3" }}
            >
              {" "}
              {user.username}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon fontSize="small">
                  <MeetingRoomOutlinedIcon />
                </ListItemIcon>
                <ListItemText onClick={logout}> Logout</ListItemText>
              </MenuItem>
            </Menu>
            <Button
              variant="contained"
              endIcon={<LibraryAddOutlinedIcon />}
              onClick={() => {
                setOpenModal(true);
              }}
              sx={{
                backgroundColor: "#4654a3",
                "&:hover": { backgroundColor: "#dddbf1" },
              }}
            >
              ADD NEW{" "}
            </Button>
          </div>
          <div className="dashboard__videolist">
            <UserVideoList videos={videoList} />
          </div>
          {openModal && (
            <NewVideoModal
              closeModal={setOpenModal}
              fetchVideoList={fetchVideoList}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
