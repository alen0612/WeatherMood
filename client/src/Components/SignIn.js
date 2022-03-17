import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function SignIn(props) {
  const handleLeaveClick = () => {
    props.setOpenSignIn(false);
    props.setOpenSignUp(false);
  };

  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/users/signin", data)
      .then((response) => {
        handleLeaveClick();
      })
      .catch((err) => {
        alert("Wrong Username or Password!");
      });
  };

  return (
    <div className="Sign">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="SignArea">
          <ErrorMessage
            name="username"
            component="span"
            className="SignErrorMessage"
          />
          <Field
            className="SignUsername"
            name="username"
            placeholder="Username..."
            autoComplete="off"
          ></Field>
          <ErrorMessage
            name="password"
            component="span"
            className="SignErrorMessage"
          />
          <Field
            className="SignPassword"
            name="password"
            placeholder="Password..."
            autoComplete="off"
            type="password"
          ></Field>
          <div className="SignButtons">
            <button type="submit">Sign In</button>
            <button
              onClick={() => {
                handleLeaveClick();
              }}
            >
              Exit
            </button>
          </div>
        </Form>
      </Formik>

      {/*<div className="SignArea">
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
      </div>*/}
    </div>
  );
}

export default SignIn;
