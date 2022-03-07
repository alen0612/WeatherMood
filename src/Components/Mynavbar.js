import "../App.css";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";

function Mynavbar(props) {
  const [showToday, setShowToday] = useState(true);

  useEffect(() => {
    //console.log("use effect: " + showToday);
    if (showToday) props.setShowToday(true);
    else props.setShowToday(false);
  });

  let todayFontWeight = showToday
    ? { fontWeight: "bold" }
    : { fontWeight: "normal" };

  let forecastFontWeight = showToday
    ? { fontWeight: "normal" }
    : { fontWeight: "bold" };

  return (
    /*<Navbar bg="light" sticky="top">
      <Container>
        <Navbar.Brand>WeatherMood</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/today">Today</Nav.Link>
          <Nav.Link href="/forecast">Forcast</Nav.Link>
        </Nav>
      </Container>
  </Navbar>*/
    <Navbar bg="light" sticky="top">
      <Container>
        <Navbar.Brand>WeatherMood</Navbar.Brand>
        <Nav className="me-auto">
          <div
            className="navItem"
            style={todayFontWeight}
            onClick={() => {
              //console.log("today clicked");
              setShowToday(true);
            }}
          >
            Today
          </div>
          <div
            className="navItem"
            style={forecastFontWeight}
            onClick={() => {
              //console.log("forecast clicked");
              setShowToday(false);
            }}
          >
            Forcast
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;
