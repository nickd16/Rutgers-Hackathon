import React, { useState, useEffect } from "react";
import "./About.css";
import { Navbar } from "../../components/components";
import { aboutData } from "./data";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const About = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [gradientPercentage, setGradientPercentage] = useState(
    (step / totalSteps) * 100
  );
  const navigate = useNavigate();

  /* USER CLICKS THE NEXT STEP BUTTON */
  const handleNextStep = () => {
    if (step === 5) return navigate("/");
    setStep((prev) => prev + 1);
  };

  // change gradient percentage whenever step value is changed
  useEffect(() => {
    setGradientPercentage((step / totalSteps) * 100);
  }, [step]);
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content">
        <span className="bar"></span>
        <span
          className="gradient"
          style={{
            background: `linear-gradient(90deg, #4CACBC, #80ED99)`,
            width: `${gradientPercentage - 7.5}%`,
          }}
        ></span>

        <div className="about-steps">
          {aboutData.map((currStep, index) => (
            <div
              key={index}
              className={`step-container flex ${
                step === index + 1 ? "" : "hide"
              } `}
            >
              <div className="text-container">
                <h1>Step {index + 1}:</h1>
                <h3>{currStep.title}</h3>
                <p>{currStep.subtitle}</p>

                <div
                  onClick={() => handleNextStep()}
                  className="button-container flex"
                >
                  {step === 5 ? <p>Home</p> : <p>Next</p>}
                  <BsArrowRight />
                </div>
              </div>
              <div className="image-container">
                <img src={currStep.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
