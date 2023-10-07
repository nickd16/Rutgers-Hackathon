import React from "react";
import "./Main.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Main = (props) => {
  const navigate = useNavigate();
  return (
    <div className="main-container flex">
      <div className="text-container">
        <span className="square-1"></span>
        <span className="square-2"></span>
        <h1 className="title">
          Unleash Your <span>Imagination</span> With World-Class{" "}
          <span> AI </span>{" "}
        </h1>
        <p className="subtitle ls-1 small-text">
          Play a super cool game where you write something, AI turns it into
          pictures, and then, your friends can guess what that prompt was that
          generated that image. Have Fun!!!{" "}
        </p>
        <div
          onClick={() => navigate("/play")}
          className="button-container flex"
        >
          <AiFillPlayCircle />
          <p className="flex">Play</p>
        </div>
      </div>
      <div className="video-container">
        <h1>video</h1>
        <video src=""> Video</video>
      </div>
    </div>
  );
};

export default Main;
