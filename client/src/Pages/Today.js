import "../App.css";
import TodayInfo from "../Components/TodayInfo";
import Searchbar from "../Components/Searchbar";
import PostBar from "../Components/PostBar";
import Loading from "../Components/Loading";
import React from "react";

function Today(props) {
  return (
    <div className="todayContainer">
      <div>
        <Loading />
      </div>
      <div className="Background" style={props.background}></div>
      <div className="today">
        <Searchbar
          setLocation={props.setLocation}
          setUnit={props.setUnit}
          todayWeather={props.todayWeather}
          setTodayWeather={props.setTodayWeather}
          getWeather={props.getWeather}
        />
        <TodayInfo todayWeather={props.todayWeather} logo={props.logo} />
        <PostBar />
      </div>
      <div></div>
    </div>
  );
}

export default Today;
