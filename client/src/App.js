import React, { useEffect } from "react";
import { Home, Play, About } from "./scenes/scenes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    //initialize AOS
    AOS.init({ duration: 800, delay: 0, easing: "ease" });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
