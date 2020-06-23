import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import signUpFormSchema from "./validation/signUpFormSchema";
import * as yup from "yup";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialVal = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
};

const initialErr = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
};

const initialDisabled = true;

export default function Signup() {
  //determines button clickability
  const [disabled, setDisabled] = useState(initialDisabled);
  //holds current form values
  const [formValues, setFormValues] = useState(initialVal);
  //holds the errors which update based on validation
  const [formErrors, setFormErrors] = useState(initialErr);

  let history = useHistory();


  const postNewUser = newUser => {
    axiosWithAuth()
      .post(`https://virtual-reality-fundraising.herokuapp.com/api/register`, formValues)
      .then(res => {
        console.log(res);
        // localStorage.setItem("token", res.data.payload);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onInputChange = e => {
    const { name, value } = e.target;

    yup
      .reach(signUpFormSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch(err => {
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

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstname: formValues.firstname.trim(),
      lastname: formValues.lastname.trim(),
      email: formValues.email.trim(),
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    signUpFormSchema.isValid(formValues).then(valid => {

      //if form values meet validation enable the button
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <h3>Create your account.</h3>

      {/* <label htmlFor="firstname">
        First Name&nbsp; */}
				<input
        placeholder="First Name"
          name="firstname"
          type="text"
          onChange={onInputChange}
          value={formValues.firstname}
        />
      {/* </label> */}
      <div>{formErrors.firstname}</div>

      {/* <label htmlFor="lastname">
        Last Name */}
				<input
        placeholder="Last Name"
          name="lastname"
          type="text"
          onChange={onInputChange}
          value={formValues.lastname}
        />
      {/* </label> */}
      <div>{formErrors.lastname}</div>

      {/* <label htmlFor="email">
        Email */}
				<input
        placeholder="Email"
          name="email"
          type="email"
          onChange={onInputChange}
          value={formValues.email}
        />
      {/* </label> */}
      <div>{formErrors.email}</div>
      <div>{formErrors.username}</div>

      {/* <label htmlFor="password">
        Password */}
				<input
        placeholder="Create Password"
          name="password"
          type="password"
          onChange={onInputChange}
          value={formValues.password}
        />
      {/* </label> */}
      <div>{formErrors.password}</div>
      <button className="button" type="submit" disabled={disabled}>Sign Up Now</button>

      <p>Are you a :</p>
      <div className="role">
        <input className="fundraiser" type="radio" name="role" />
        <input className="funder" type="radio" name="role" />
      </div>

      <div className="errors">
        <div></div>
        <div></div>
      </div>

      <p>Already have an account?</p><Link className="button" to="/">Login</Link>{" "}
    </form>
  );
}
