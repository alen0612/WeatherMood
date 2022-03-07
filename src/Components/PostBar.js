import "../App.css";
import WeatherMood from "./WeatherMood";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faCloud,
  faSmog,
  faSnowflake,
  faSun,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

function PostBar(props) {
  let today;

  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
  });
  const [moodList, setMoodList] = useState([]);

  const options = [
    {
      value: "Clear",
      label: (
        <>
          <FontAwesomeIcon icon={faSun} className="PostBarSelectIcon" />
          <span className="PostBarSelectSpan">Clear</span>
        </>
      ),
    },
    {
      value: "Cloud",
      label: (
        <>
          <FontAwesomeIcon icon={faCloud} className="PostBarSelectIcon" />
          <span className="PostBarSelectSpan">Cloud</span>
        </>
      ),
    },
    {
      value: "Thunder",
      label: (
        <>
          <FontAwesomeIcon
            icon={faBoltLightning}
            className="PostBarSelectIcon"
          />
          <span className="PostBarSelectSpan">Thunder</span>
        </>
      ),
    },
    {
      value: "Rain",
      label: (
        <>
          <FontAwesomeIcon icon={faTint} className="PostBarSelectIcon" />
          <span className="PostBarSelectSpan">Rain</span>
        </>
      ),
    },
    {
      value: "Mist",
      label: (
        <>
          <FontAwesomeIcon icon={faSmog} className="PostBarSelectIcon" />
          <span className="PostBarSelectSpan">Mist</span>
        </>
      ),
    },
    {
      value: "Snow",
      label: (
        <>
          <FontAwesomeIcon icon={faSnowflake} className="PostBarSelectIcon" />
          <span className="PostBarSelectSpan">Snow</span>
        </>
      ),
    },
  ];

  const selectPlacholder = "Mood";

  const handleSelect = (event) => {
    setMood(event.value);
  };

  const postMood = () => {
    today = new Date();
    setDate({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes(),
    });

    setMoodList([...moodList, { content: content, mood: mood, date: date }]);
    setContent("");
    setMood(null);
  };

  return (
    <div className="PostBar">
      <div className="PostBarInput">
        <Select
          placeholder={selectPlacholder}
          options={options}
          className="PostBarMood"
          isSearchable={false}
          onChange={(event) => handleSelect(event)}
        />
        <textarea
          className="PostBarContent"
          placeholder="What's on your mind?"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
        <button className="PostBarButton" onClick={postMood}>
          Post
        </button>
      </div>
      <div className="PostBarSpace"></div>
      <div className="PostBarOutput">
        {moodList.map((list, index) => {
          return (
            <WeatherMood
              content={list.content}
              mood={list.mood}
              date={date}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostBar;
