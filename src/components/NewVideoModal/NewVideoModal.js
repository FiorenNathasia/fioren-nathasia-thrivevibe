// NewVideoModal.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./NewVideoModal.scss";

export default function NewVideoModal({ closeModal, fetchVideoList }) {
  const [formData, setFormData] = useState({
    url: "",
    prompt: "",
  });

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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
    } catch (error) {
      setIsError(true);
      console.error(error);
    }

    // Reset the form
    setFormData({
      url: "",
      prompt: "",
    });

    closeModal();
    fetchVideoList();
    // Navigate to the desired route
    navigate("/");
  };
  return (
    <div className="new-video-modal">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
