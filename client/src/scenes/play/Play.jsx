import React, { useState } from "react";
import "./Play.css";
import { Navbar } from "../../components/components";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Axios from "axios";
import { imagesData } from "./data";
const Play = () => {
  const [step, setStep] = useState(1);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  /* HANDLE USER TEXT INPUT */
  const handleTextAreaChange = (e) => {
    setText(e.target.value);
  };
  /* PASS THE TEXT ENTERED TO THE BACKEND TO GENERATE THE IMAGE */
  const handleGenerateImage = async () => {
    if (text.length === 0) return;
    setStep(2);

    const requestText = text.replace(/ /g, "-");

    const request = await Axios.post(
      `http://127.0.0.1:5000/play/${requestText}`
    );

    setStep(3);
  };
  return (
    <div className="play-container">
      <Navbar />

      <div className="play-content ">
        {/* STEP 1: USER INPUTS TEXT TO GENERATE an IMAGE */}
        {step === 1 ? (
          <div className="step-1-container flex">
            <div className="text-container flex flex-col">
              <h2>
                Turn Text Into <span>Art</span>
              </h2>
              <p className="ls-1">
                Type your sentence below to transform your words into an image
              </p>
              <textarea
                className="text-input"
                value={text}
                style={{ height: textAreaHeight }}
                onChange={handleTextAreaChange}
                placeholder="Enter Text Here"
              ></textarea>
              <div className="button-container flex">
                <button className="generate" onClick={handleGenerateImage}>
                  Generate
                </button>
                <button className="back" onClick={() => navigate("/")}>
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="step-2-container">
            {/* STEP 2: USER IS WAITING FOR IMAGES TO GENERATE */}
            <div className="loading-container flex flex-col">
              <AiOutlineLoading3Quarters className="loading" />
              <h3 className="ls-2">Generating Images</h3>
            </div>
          </div>
        ) : step === 3 ? (
          <div className="step-3-container">
            {/* STEP 3 : USER SELECTS ONE OUT OF THE FOUR IMAGES */}
            <h1>Select the Image You Want To Use </h1>
            <div className="images-container">
              {imagesData.map((img, index) => (
                <div key={index} className="image flex flex-col">
                  <img src={img.url} alt="" />
                  <button style={{ background: img.buttonColor }}>
                    {img.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : step === 4 ? (
          <div className="step-4-container">
            {/* STEP 4: USER GUESSES THE CAPTION FOR THE IMAGE */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Play;
