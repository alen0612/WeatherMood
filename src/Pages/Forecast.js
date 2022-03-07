import "../App.css";
import React from "react";
import Loading from "../Components/Loading";
import Searchbar from "../Components/Searchbar";

function Forecast(props) {
  let future = [props.date + 2, props.date + 3, props.date + 4];
  for (var i = 0; i < 3; i++) if (future[i] > 6) future[i] -= 7;

  let tomorrowBackground, tomorrowLogo;
  let icon1, icon2, icon3, ID;

  ID = props.forecast.id[0];
  if (ID >= 200 && ID < 300) {
    tomorrowBackground = { backgroundImage: "url(/thunderstorm.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/thunderstormLogo.png)" };
  } else if (ID >= 300 && ID < 600) {
    tomorrowBackground = { backgroundImage: "url(/rain.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/rainLogo.png)" };
  } else if (ID >= 600 && ID < 700) {
    tomorrowBackground = { backgroundImage: "url(/snow.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/snowLogo.png)" };
  } else if (ID >= 700 && ID < 800) {
    tomorrowBackground = { backgroundImage: "url(/mist.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/mistLogo.png)" };
  } else if (ID === 800) {
    tomorrowBackground = { backgroundImage: "url(/clear.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/clearLogo.png)" };
  } else {
    tomorrowBackground = { backgroundImage: "url(/cloud.jpg)" };
    tomorrowLogo = { backgroundImage: "url(/cloudLogo.png)" };
  }

  ID = props.forecast.id[1];
  if (ID >= 200 && ID < 300) icon1 = "/thunderstormIcon.png";
  else if (ID >= 300 && ID < 600) icon1 = "/rainIcon.png";
  else if (ID >= 600 && ID < 700) icon1 = "/snowIcon.png";
  else if (ID >= 700 && ID < 800) icon1 = "/mistIcon.png";
  else if (ID === 800) icon1 = "/clearIcon.png";
  else icon1 = "/cloudIcon.png";

  ID = props.forecast.id[2];
  if (ID >= 200 && ID < 300) icon2 = "/thunderstormIcon.png";
  else if (ID >= 300 && ID < 600) icon2 = "/rainIcon.png";
  else if (ID >= 600 && ID < 700) icon2 = "/snowIcon.png";
  else if (ID >= 700 && ID < 800) icon2 = "/mistIcon.png";
  else if (ID === 800) icon2 = "/clearIcon.png";
  else icon2 = "/cloudIcon.png";

  ID = props.forecast.id[3];
  if (ID >= 200 && ID < 300) icon3 = "/thunderstormIcon.png";
  else if (ID >= 300 && ID < 600) icon3 = "/rainIcon.png";
  else if (ID >= 600 && ID < 700) icon3 = "/snowIcon.png";
  else if (ID >= 700 && ID < 800) icon3 = "/mistIcon.png";
  else if (ID === 800) icon3 = "/clearIcon.png";
  else icon3 = "/cloudIcon.png";

  return (
    <div className="Forecast">
      <div>
        <Loading />
      </div>
      <div style={tomorrowBackground} className="Background"></div>
      <div className="forecastInfo">
        <Searchbar
          setLocation={props.setLocation}
          setUnit={props.setUnit}
          todayWeather={props.todayWeather}
          setTodayWeather={props.setTodayWeather}
          getWeather={props.getWeather}
        />
        <div className="tomorrow" style={tomorrowLogo}>
          <p className="tomorrowWeather">
            Tomorrow: {props.forecast.weather[0]}
          </p>
          <p className="tomorrowTemp">
            {props.forecast.temp[0]}
            {props.todayWeather.graph}
          </p>
        </div>
        <div className="futureDays">
          <div>
            {props.dayList[future[0]]}: {props.forecast.temp[1]}°
            <img src={icon1} alt="clear" className="futureIcon"></img>
          </div>
          <div>
            {props.dayList[future[1]]}: {props.forecast.temp[2]}°
            <img src={icon2} alt="clear" className="futureIcon"></img>
          </div>
          <div>
            {props.dayList[future[2]]}: {props.forecast.temp[3]}°
            <img src={icon3} alt="clear" className="futureIcon"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
