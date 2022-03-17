import "../App.css";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function Mynavbar(props) {
  const [showToday, setShowToday] = useState(true);

  useEffect(() => {
    //console.log("use effect: " + showToday);
    if (showToday) props.setShowToday(true);
    else props.setShowToday(false);
  });

  let todayFontWeight =
    showToday && !props.openSignIn && !props.openSignUp
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };

  let forecastFontWeight =
    !showToday && !props.openSignIn && !props.openSignUp
      ? { fontWeight: "bold" }
      : { fontWeight: "normal" };

  let signInFontWeight = props.openSignIn
    ? { fontWeight: "bold" }
    : { fontWeight: "normal" };

  let signUpFontWeight = props.openSignUp
    ? { fontWeight: "bold" }
    : { fontWeight: "normal" };

  const handleSignInClick = () => {
    props.setOpenSignIn(true);
    props.setOpenSignUp(false);
  };

  const handleSignUpClick = () => {
    props.setOpenSignIn(false);
    props.setOpenSignUp(true);
  };

  return (
    <div>
      <Navbar bg="light" sticky="top">
        <Container>
          <Navbar.Brand>WeatherMood</Navbar.Brand>
          <Nav className="me-auto">
            <div className="navbarLinks">
              <div className="navbarLeft">
                <div
                  className="navItem"
                  style={todayFontWeight}
                  onClick={() => {
                    if (!props.openSignIn && !props.openSignUp)
                      setShowToday(true);
                  }}
                >
                  Today
                </div>
                <div
                  className="navItem"
                  style={forecastFontWeight}
                  onClick={() => {
                    if (!props.openSignIn && !props.openSignUp)
                      setShowToday(false);
                  }}
                >
                  Forcast
                </div>
              </div>
              <div className="navbarRight">
                <div
                  className="navItem"
                  style={signInFontWeight}
                  onClick={() => {
                    handleSignInClick();
                  }}
                >
                  Sign In
                </div>
                <div
                  className="navItem"
                  style={signUpFontWeight}
                  onClick={() => {
                    handleSignUpClick();
                  }}
                >
                  Sign Up
                </div>
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Mynavbar;
