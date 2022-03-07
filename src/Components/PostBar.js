import "../App.css";
import WeatherMood from "./WeatherMood";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function PostBar(props) {
  const [mood, setMood] = useState("Clear");
  const [content, setContent] = useState("");
  const [moodList, setMoodList] = useState([]);

  const postMood = () => {
    console.log(content);
    setMoodList([...moodList, { content: content, mood: mood }]);
  };

  return (
    <div className="PostBar">
      <div className="PostBarInput">
        <select
          className="PostBarMood"
          value={mood}
          onChange={(event) => {
            setMood(event.target.value);
          }}
        >
          <option value="Clear" className="moods">
            Clear
          </option>
          <option value="Rain" className="moods">
            Rain
          </option>
          <option value="Cloud" className="moods">
            Cloud
          </option>
          <option value="Thunder" className="moods">
            Thunder
          </option>
          <option value="Mist" className="moods">
            Mist
          </option>
          <option value="Snow" className="moods">
            Snow
          </option>
        </select>
        <textarea
          className="PostBarContent"
          placeholder="What's on your mind?"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
        <button className="PostBarButton" onClick={postMood}>
          Post
        </button>
      </div>
      <div className="PostBarOutput">
        {moodList.map((list) => {
          return <WeatherMood content={list.content} mood={list.mood} />;
        })}
      </div>
    </div>
  );
}

export default PostBar;
