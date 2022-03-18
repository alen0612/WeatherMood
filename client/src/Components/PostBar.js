import "../App.css";
import WeatherMood from "./WeatherMood";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faCloud,
  faQuestionCircle,
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
  const [id, setID] = useState(0);
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

  const defaultMood = {
    value: "Mood",
    label: (
      <>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="PostBarSelectIcon"
        />
        <span className="PostBarSelectSpan">Mood</span>
      </>
    ),
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      //console.log(response.data);
      setMoodList(response.data);
      //console.log(moodList);
    });
  }, []);

  const handleSelect = (event) => {
    setMood(event.value);
  };

  const postMood = () => {
    if (content === "" || mood === "Mood" || mood === "") return;
    today = new Date();

    axios
      .post(
        "http://localhost:3001/posts",
        {
          content: content,
          mood: mood,
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
          hour: today.getHours(),
          minute: today.getMinutes(),
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("Loggin to post!");
        } else {
          setMoodList([
            ...moodList,
            {
              content: content,
              mood: mood,
              id: id,
              year: today.getFullYear(),
              month: today.getMonth() + 1,
              day: today.getDate(),
              hour: today.getHours(),
              minute: today.getMinutes(),
              username: response.data.username,
            },
          ]);

          setContent("");
          setMood("");
          setID(id + 1);
        }
      });
  };

  const deletePost = (ID) => {
    axios.delete(`http://localhost:3001/posts/${ID}`).then(() => {
      console.log("remove the post");
      const newList = moodList;
      const updateList = newList.filter((item) => item.id !== ID);

      setMoodList(updateList);
    });
  };

  return (
    <div className="PostBar">
      <div className="PostBarInput">
        <Select
          placeholder={defaultMood.label}
          options={options}
          className="PostBarMood"
          isSearchable={false}
          onChange={handleSelect}
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
        {moodList.map((moodList, index) => {
          return (
            <WeatherMood
              username={moodList.username}
              content={moodList.content}
              mood={moodList.mood}
              id={moodList.id}
              year={moodList.year}
              month={moodList.month}
              day={moodList.day}
              hour={moodList.hour}
              minute={moodList.minute}
              key={index}
              deletePost={deletePost}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PostBar;
