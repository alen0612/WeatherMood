import "./App.css";
import Mynavbar from "./Components/Mynavbar";
import Today from "./Pages/Today";
import Forecast from "./Pages/Forecast";
import React, { useEffect, useState } from "react";
import { Alert } from "bootstrap";
import Axios from "axios";

const APIkey = "029ab88b8a27d39ef20a062c38c4b411";

function App() {
  const [showToday, setShowToday] = useState(true);

  const [date, setDate] = useState(0);
  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const [todayWeather, setTodayWeather] = useState({
    location: "Taipei",
    unit: "metric",
    temp: 0,
    graph: "°C",
    weather: "Clear",
  });
  const [forecast, setForecast] = useState({
    temp: [0, 0, 0, 0],
    weather: ["Clear", "Clear", "Clear", "Clear"],
    id: [0, 0, 0, 0],
    location: "Taipei",
  });
  const [logo, setLogo] = useState({ backgroundImage: "url(/clearLogo.png)" });
  const [background, setBackground] = useState({
    backgroundImage: "url(/clear.jpg)",
  });

  useEffect(() => {
    getLocation();
    getDate();
  }, []);

  const getDate = () => {
    var day = new Date();
    setDate(day.getDay());
  };

  const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(getLonandLat);
    else Alert("Geolocation is not supported!");
  };

  function getLonandLat(position) {
    initialWeather(position.coords.longitude, position.coords.latitude);
    //initialForecast(position.coords.longitude, position.coords.latitude);
  }

  const initialWeather = (lon, lat) => {
    // this will render initial page when user get in website for the first time
    Axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=" +
        todayWeather.unit +
        "&appid=" +
        APIkey
    )
      .then((response) => {
        //console.log(response.data);
        //console.log(response.data.weather[0].main);
        setTodayWeather((prevState) => ({
          ...prevState,
          graph: todayWeather.unit === "metric" ? "°C" : "°F",
          temp: parseInt(response.data.main.temp),
          location: response.data.name,
        }));
        checkWeather(response.data.weather[0].id);
      })
      .catch((error) => {
        alert("City Not Found!");
      });

    Axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=" +
        todayWeather.unit +
        "&appid=" +
        APIkey
    ).then((response) => {
      //console.log(response.data.city.name);
      setForecast((prevState) => ({
        ...prevState,
        temp: [
          parseInt(response.data.list[8].main.temp),
          parseInt(response.data.list[16].main.temp),
          parseInt(response.data.list[24].main.temp),
          parseInt(response.data.list[32].main.temp),
        ],
        location: response.data.city.name,
      }));
      checkForecastWeather([
        response.data.list[8].weather[0].id,
        response.data.list[16].weather[0].id,
        response.data.list[24].weather[0].id,
        response.data.list[32].weather[0].id,
      ]);
    });
  };

  function checkForecastWeather(ID) {
    //console.log("set forecast ID");
    setForecast((prevState) => ({
      ...prevState,
      id: [ID[0], ID[1], ID[2], ID[3]],
      weather: [
        setForecastIcon(ID[0]),
        setForecastIcon(ID[1]),
        setForecastIcon(ID[2]),
        setForecastIcon(ID[3]),
      ],
    }));
  }

  function setForecastIcon(ID) {
    //console.log("set forecast icon");
    if (ID >= 200 && ID < 300) return "Tunderstorm";
    else if (ID >= 300 && ID < 600) return "Rain";
    else if (ID >= 600 && ID < 700) return "Snow";
    else if (ID >= 700 && ID < 800) return "Mist";
    else if (ID === 800) return "Clear";
    else return "Clouds";
  }

  const getWeather = () => {
    //console.log("int today.getWeather: " + unit);
    Axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        todayWeather.location +
        "&units=" +
        todayWeather.unit +
        "&appid=" +
        APIkey
    )
      .then((response) => {
        //console.log(response.data);
        //console.log(response.data.weather[0].main);

        setTodayWeather((prevState) => ({
          ...prevState,
          graph: todayWeather.unit === "metric" ? "°C" : "°F",
          temp: parseInt(response.data.main.temp),
        }));

        checkWeather(response.data.weather[0].id);
      })
      .catch((error) => {
        alert("City Not Found!");
      });

    Axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        todayWeather.location +
        "&units=" +
        todayWeather.unit +
        "&appid=" +
        APIkey
    ).then((response) => {
      //console.log(response.data);
      setForecast((prevState) => ({
        ...prevState,
        temp: [
          parseInt(response.data.list[8].main.temp),
          parseInt(response.data.list[16].main.temp),
          parseInt(response.data.list[24].main.temp),
          parseInt(response.data.list[32].main.temp),
        ],
        location: response.data.city.name,
      }));
      checkForecastWeather([
        response.data.list[8].weather[0].id,
        response.data.list[16].weather[0].id,
        response.data.list[24].weather[0].id,
        response.data.list[32].weather[0].id,
      ]);
    });
  };

  const checkWeather = (weatherID) => {
    if (weatherID >= 200 && weatherID < 300) {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Thunderstorm",
      }));
      setBackground({ backgroundImage: "url(/thunderstorm.jpg)" });
      setLogo({ backgroundImage: "url(/thunderstormLogo.png)" });
    } else if (weatherID >= 300 && weatherID < 600) {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Rain",
      }));
      setBackground({ backgroundImage: "url(/rain.jpg)" });
      setLogo({ backgroundImage: "url(/rainLogo.png)" });
    } else if (weatherID >= 600 && weatherID < 700) {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Snow",
      }));
      setBackground({ backgroundImage: "url(/snow.jpg)" });
      setLogo({ backgroundImage: "url(/snowLogo.png)" });
    } else if (weatherID >= 700 && weatherID < 800) {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Mist",
      }));
      setBackground({ backgroundImage: "url(/mist.jpg)" });
      setLogo({ backgroundImage: "url(/mistLogo.png)" });
    } else if (weatherID === 800) {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Clear",
      }));
      setBackground({ backgroundImage: "url(/clear.jpg)" });
      setLogo({ backgroundImage: "url(/clearLogo.png)" });
    } else {
      setTodayWeather((prevState) => ({
        ...prevState,
        weather: "Clouds",
      }));
      setBackground({ backgroundImage: "url(/cloud.jpg)" });
      setLogo({ backgroundImage: "url(/cloudLogo.png)" });
    }
  };

  function setLocation(data) {
    setTodayWeather((prevState) => ({
      ...prevState,
      location: data,
    }));
  }

  function setUnit(data) {
    setTodayWeather((prevState) => ({
      ...prevState,
      unit: data,
    }));
  }

  return showToday === true ? (
    <div className="App">
      <Mynavbar setShowToday={setShowToday} />

      <Today
        background={background}
        logo={logo}
        todayWeather={todayWeather}
        getWeather={getWeather}
        setTodayWeather={setTodayWeather}
        setLocation={setLocation}
        setUnit={setUnit}
      />
    </div>
  ) : (
    <div className="App">
      <Mynavbar setShowToday={setShowToday} />

      <Forecast
        todayWeather={todayWeather}
        date={date}
        dayList={dayList}
        forecast={forecast}
        getWeather={getWeather}
        setTodayWeather={setTodayWeather}
        setLocation={setLocation}
        setUnit={setUnit}
      />
    </div>
  );
}

export default App;
