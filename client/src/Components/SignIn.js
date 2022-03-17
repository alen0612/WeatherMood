import React from "react";

function SignIn(props) {
  const handleLeaveClick = () => {
    props.setOpenSignIn(false);
    props.setOpenSignUp(false);
  };

  return (
    <div className="Sign">
      <div className="SignArea">
        <button
          className="SignLeave"
          onClick={() => {
            handleLeaveClick();
          }}
        >
          X
        </button>
        <input className="SignUsername" placeholder="Username..."></input>
        <input className="SignPassword" placeholder="Password..."></input>
        <div className="SignButtons">
          <button
            onClick={() => {
              props.setOpenSignIn(false);
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
