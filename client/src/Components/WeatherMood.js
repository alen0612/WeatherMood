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
  let icon;

  if (props.mood === "Clear") icon = <FontAwesomeIcon icon={faSun} />;
  else if (props.mood === "Cloud") icon = <FontAwesomeIcon icon={faCloud} />;
  else if (props.mood === "Thunder")
    icon = <FontAwesomeIcon icon={faBoltLightning} />;
  else if (props.mood === "Rain") icon = <FontAwesomeIcon icon={faTint} />;
  else if (props.mood === "Snow") icon = <FontAwesomeIcon icon={faSnowflake} />;
  else if (props.mood === "Mist") icon = <FontAwesomeIcon icon={faSmog} />;

  const handleClick = () => {
    props.deletePost(props.id);
  };

  return props.content === "" || props.mood === "Mood" || props.mood === "" ? (
    <div></div>
  ) : (
    <div className="WeatherMood">
      <div className="WeatherMoodIcon">{icon}</div>
      <div className="WeatherMoodContent">
        <div className="WeatherMoodDate">
          {props.year}-{props.month}-{props.day} at {props.hour}:{props.minute}{" "}
          {props.hour > 12 ? "PM" : "AM"}
        </div>
        <div className="WeatherMoodText">{props.content}</div>
      </div>
      <button className="WeatherMoodDelete" onClick={handleClick}>
        X
      </button>
    </div>
  );
}

export default WeatherMood;
