import React from "react";
import classes from '../styles/Slider.module.css'
import leftArrow from "./icons/left-arrow.svg";
import rightArrow from "./icons/right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={`${classes["btn-slide"]} ${direction === "next" ? classes.next :  classes.prev}`}
    >
      <div>{direction === "next" ? '>' : '<'} </div>
    </button>
  );
}