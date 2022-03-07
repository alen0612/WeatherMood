import "../App.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faCloud,
  faSmog,
  faSnowflake,
  faSun,
  faTint,
} from "@fortawesome/free-solid-svg-icons";

function WeatherMood(props) {
  console.log(props);
  let icon;

  if (props.mood === "Clear") icon = <FontAwesomeIcon icon={faSun} />;
  else if (props.mood === "Cloud") icon = <FontAwesomeIcon icon={faCloud} />;
  else if (props.mood === "Thunder")
    icon = <FontAwesomeIcon icon={faBoltLightning} />;
  else if (props.mood === "Rain") icon = <FontAwesomeIcon icon={faTint} />;
  else if (props.mood === "Snow") icon = <FontAwesomeIcon icon={faSnowflake} />;
  else if (props.mood === "Mist") icon = <FontAwesomeIcon icon={faSmog} />;

  return props.content === "" || props.mood === "" ? (
    <div></div>
  ) : (
    <div className="WeatherMood">
      <div className="WeatherMoodIcon">{icon}</div>
      <div className="WeatherMoodContent">
        <div className="WeatherMoodDate">
          {props.date.year}-{props.date.month}-{props.date.day} at{" "}
          {props.date.hour}:{props.date.minute}{" "}
          {props.date.hour > 12 ? "PM" : "AM"}
        </div>
        <div className="WeatherMoodText">{props.content}</div>
      </div>
    </div>
  );
}

export default WeatherMood;
