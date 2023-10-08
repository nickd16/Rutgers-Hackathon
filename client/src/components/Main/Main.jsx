import React from "react";
import "./Main.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import demo from "../../assets/demo.mp4";
const Main = (props) => {
  const navigate = useNavigate();
  return (
    <div className="main-container flex">
      <div data-aos="fade-right" className="text-container">
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
      <div data-aos="fade-left" className="video-container">
        <video src={demo} autoPlay muted></video>
      </div>
    </div>
  );
};

export default Main;
