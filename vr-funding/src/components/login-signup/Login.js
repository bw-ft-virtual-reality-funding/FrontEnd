import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";
import loginFormSchema from "./validation/loginFormSchema";
import axios from "axios";

const initialVal = {
  username: "",
  password: "",
};

const initialErr = {
  username: "",
  password: "",
};

const initialDisabled = true;

export default function Login() {
  //determines button clickability
  const [disabled, setDisabled] = useState(initialDisabled);
  //holds current form values
  const [formValues, setFormValues] = useState(initialVal);
  //holds errors which update based on validation
  const [formErrors, setFormErrors] = useState(initialErr);

  let history = useHistory();

  const onSubmitHandler = (e) => {
    axiosWithAuth().post(`URL`);
  };

  const loginUser = (newUser) => {
    axios
      .post("https://regres.in/api/users", newUser) //pending URL
      .then((response) => {
        console.log(response); //need token here
        history.push('')//will navigate to home page 
      })
      .catch((err) => {
        console.log(err);
      })
    // .finally(() => {
    //     setFormValues(initialVal)
    // })
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    yup
      .reach(loginFormSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    loginUser(user);
  };

  useEffect(() => {
    loginFormSchema.isValid(formValues).then((valid) => {
      //if values meet validation, enable the login button
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>

        <label>
          Username&nbsp;
          <input
            name="username"
            type="text"
            onChange={onInputChange}
            value={formValues.username}
          />
        </label>
        <div>{formErrors.username}</div>

        <label>
          Password&nbsp;
          <input
            name="password"
            type="password"
            onChange={onInputChange}
            value={formValues.password}
          />
        </label>
        <div>{formErrors.password}</div>

        <div>
          <button disabled={disabled}>Login</button>
        </div>

        
      </form>

      <div>
        Don't have an account yet?<Link to="/Signup">Sign Up</Link>{" "}
      </div>
    </div>
  );
}
