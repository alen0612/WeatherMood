import "../App.css";
import React, { useState } from "react";

function WeatherMood(props) {
  return props.content === "" ? (
    <div></div>
  ) : (
    <div className="WeatherMood">
      <div className="WeatherMoodIcon">{props.mood}</div>
      <div className="WeatherMoodText">{props.content}</div>
    </div>
  );
}

export default WeatherMood;
