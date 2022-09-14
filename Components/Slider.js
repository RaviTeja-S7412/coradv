import React, { useState, useEffect } from "react";
import data from "./dataSlider";
import BtnSlider from "./BtnSlider";

import classes from "../styles/Slider.module.css";

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    if (slideIndex !== data.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === data.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(data.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    let slider = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [slideIndex]);

  return (
    <div className="flex flex-col justify-center align-middle ">
      <div className={classes["container-slider"]}>
        {data.map((obj, index) => {
          const { id, url, title, subTitle } = obj;

          return (
            <div
              key={id}
              className={
                slideIndex === index + 1
                  ? `${classes.slide} ${classes["active-anim"]}`
                  : `${classes.slide}`
              }
            >
              <img src={url} />

              <div
                className="absolute backdrop-blur-sm backdrop-filter flex flex-col items-center  justify-center p-4 w-full "
                key={id}
              >
                <h1 className="font-medium text-3xl">{title}</h1>
                <p className="italic-text-lg">{subTitle}</p>
              </div>
            </div>
          );
        })}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
        <div className={classes["container-dots"]}>
          {Array.from({ length: 2 }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={`${
                slideIndex === index + 1
                  ? `${classes.dot} ${classes.active}`
                  : classes.dot
              }`}
            >
              {" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
