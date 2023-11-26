import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dahboard";
import Login from "./Pages/Login/Login";
import Feed from "./Pages/Feed/Feed";
import Header from "./components/Header/Header";
import VideoPage from "./Pages/VideoPage/VideoPage";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/myprofile" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
