import React, { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import "./NewVideoModal.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import Button from "@mui/material/Button";

export default function NewVideoModal({ closeModal, fetchVideoList }) {
  const [formData, setFormData] = useState({
    url: "",
    prompt: "",
  });

  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newVideo = {
      url: formData.url,
      prompt: formData.prompt,
    };
    const token = sessionStorage.getItem("token");

    try {
      await axios.post("http://localhost:2222/api/video/newvideo", newVideo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsError(false);

      alert("You have successfully uploaded a video!");
      closeModal();
      fetchVideoList();
    } catch (error) {
      setIsError(true);
      console.error(error);
    }

    setFormData({
      url: "",
      prompt: "",
    });
  };

  return (
    <>
      <div className="modal-background">
        <div className="new-video-modal">
          <IconButton
            onClick={() => closeModal(false)}
            aria-label="comment"
            color="primary"
            sx={{
              position: "fixed",
              top: "3%",
              left: "87%",
              color: "#4654a3",
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
          <h2>Add a New Video</h2>

          <form onSubmit={handleFormSubmit}>
            <label>
              Video URL:
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </label>
            <label>
              Prompt:
              <input
                type="text"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
              />
            </label>
            <Button
              variant="contained"
              onClick={handleFormSubmit}
              endIcon={<PublishOutlinedIcon />}
              sx={{
                backgroundColor: "#4654a3",
                "&:hover": { backgroundColor: "#dddbf1" },
              }}
            >
              Upload{" "}
            </Button>
          </form>
          {isError && <p>Could not submit comment</p>}
        </div>
      </div>
    </>
  );
}
