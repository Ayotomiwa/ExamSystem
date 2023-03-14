import "./Landing.css";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import countdown from '../assets/Countdown.mp4'

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Landing = ({ src, playbackRate }) => {
  const h1Ref = useRef(null);
  let interval = null;
  const vidRef = useRef();



  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.playbackRate = 1;
    }
  }, []);

  const handleMouseOver = () => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      h1Ref.current.innerText = h1Ref.current.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return h1Ref.current.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= h1Ref.current.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <div className="page">
      <div className="left">
        <div className="content"></div>
        <h1>Welcome</h1>
        <div className="overlay"></div>
        <video ref={vidRef} width="100%" height="80%" autoPlay loop muted src={countdown}></video>
        
      </div>
      <div className="right">
        <h1
          className="heading"
          ref={h1Ref}
          onMouseOver={handleMouseOver}
          data-value="LSBU:EXAM:TIMER"
        >
          LSBU EXAM TIMER
        </h1>
      </div>
      
    </div>
  );
};

export default Landing;
