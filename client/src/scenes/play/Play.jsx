import React, {useState} from 'react'
import "./Play.css";
import { Navbar } from '../../components/components';
import {useNavigate } from "react-router-dom";
import Axios from "axios";
const Play = () => {

    const [step, setStep] = useState(1);
    const [textAreaHeight, setTextAreaHeight] = useState("auto");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    /* HANDLE USER TEXT INPUT */
    const handleTextAreaChange = (e) => {
        setText(e.target.value);
    }
    /* PASS THE TEXT ENTERED TO THE BACKEND TO GENERATE THE IMAGE */
    const handleGenerateImage = async () => {
        if(text.length === 0) return;

        const request = await Axios.post("http://127.0.0.1:5000/play");

        console.log(request);
        console.log(request.data);
    }
  return (
    <div className='play-container'>
        <Navbar />  

        <div className="play-content ">
            {/* STEP 1: USER INPUTS TEXT TO GENERATE an IMAGE */}
            {step === 1 ? <div className='step-1-container flex'>
                <div className="text-container flex flex-col">
                    <h2>Turn Text Into <span>Art</span></h2>
                    <p className="ls-1">Type your sentence below to transform your words into an image</p>
                    <textarea
                    className='text-input'
                    value={text}
                    style={{height: textAreaHeight}}
                    onChange={handleTextAreaChange}
                    placeholder="Enter Text Here"
                    ></textarea>
                    <div className="button-container flex">
                        <button className='generate' onClick={handleGenerateImage}>Generate</button>
                        <button className='back' onClick={() => navigate("/")}>Back</button>
                    </div>
                </div>
            </div> : step === 2 ? <div>
                {/* STEP 2: USER SELECTS AN IMAGE */}
                
            </div> : ""}
        </div>
    </div>
  )
}

export default Play