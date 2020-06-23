import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import signUpFormSchema from "./validation/signUpFormSchema";
import * as yup from "yup";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialVal = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  role: "",
};

const initialErr = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  role:"",
};

const initialDisabled = true;
const initialUser = []

export default function Signup() {
  //determines button clickability
  const [disabled, setDisabled] = useState(initialDisabled);
  //holds current form values
  const [formValues, setFormValues] = useState(initialVal);
  //holds the errors which update based on validation
  const [formErrors, setFormErrors] = useState(initialErr);
  const [user, setUser] = useState(initialUser)

  let history = useHistory();

  // const getUser = () => {
  //   axios.get('')
  //     .then((response) => {
  //       console.log(response)
  //       setUser(response.data)
  //     })
  //     .catch(err =>{
  //       console.log(err)
  //     })

  // }


  const postNewUser = newUser => {
    axiosWithAuth()
      .post(`https://virtual-reality-fundraising.herokuapp.com/api/users/register`, formValues)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
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
      name: `${formValues.firstname.trim()} ${formValues.lastname.trim()}`,
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      role: formValues.role
    };
    postNewUser(newUser);
  };

  // useEffect(()=>{
  //   getUser()
  // }, [])

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
      <div className="errors">{formErrors.firstname}</div>

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
      <div className="errors">{formErrors.lastname}</div>

      {/* <label htmlFor="email">
        Email */}
				<input
        placeholder="Username"
          name="username"
          type="text"
          onChange={onInputChange}
          value={formValues.username}
        />
      {/* </label> */}
      <div className="errors">{formErrors.username}</div>

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
      <div className="errors">{formErrors.password}</div>

      <p>Are you a :</p>
      <div className="role">
        <input className="fundraiser" type="radio" name="role" onChange={onInputChange} value="fundraiser" checked={formValues.role === "fundraiser"}/>
        <input className="funder" type="radio" name="role" onChange={onInputChange} value="funder" checked={formValues.role === "funder"} />
      </div>
      <div className="errors">{formErrors.role}</div>
      
      <button className="button" type="submit" disabled={disabled}>Sign Up Now</button>
      <div className="errors">
        <div></div>
        <div></div>
      </div>

      <p>Already have an account?</p><Link className="button" to="/">Login</Link>{" "}
    </form>
  );
}
