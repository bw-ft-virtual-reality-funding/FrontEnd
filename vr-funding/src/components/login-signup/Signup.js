import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useShowPassword} from "../dashboard/hooks/useShowPassword";
import signUpFormSchema from "./validation/signUpFormSchema";
import * as yup from "yup";
import axios from "axios";
import hide from "../styles/images/hide.svg";
import show from "../styles/images/shown.svg";

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
  role: "",
};

const initialDisabled = true;
const initialUser = []

export default function Signup() {
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formValues, setFormValues] = useState(initialVal);
  const [formErrors, setFormErrors] = useState(initialErr);
  const [user, setUser] = useState(initialUser)

  const [type, hidden, onClickHandler] = useShowPassword();


  const postNewUser = newUser => {
    axios
      .post(`https://virtual-reality-fundraising.herokuapp.com/api/users/register`, newUser)
      .then(res => {
        console.log(res);
       
      })
  }

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
    window.location.assign("/")
  };

  
  useEffect(() => {
    signUpFormSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <h3>Create your account.</h3>
      <div className="errors">{formErrors.cred}</div>

      <input
        placeholder="First Name"
        name="firstname"
        type="text"
        onChange={onInputChange}
        value={formValues.firstname}
      />
     
      <div className="errors">{formErrors.firstname}</div>

   
      <input
        placeholder="Last Name"
        name="lastname"
        type="text"
        onChange={onInputChange}
        value={formValues.lastname}
      />

      <div className="errors">{formErrors.lastname}</div>

      <input
        placeholder="Username"
        name="username"
        type="text"
        onChange={onInputChange}
        value={formValues.username}
      />

      <div className="errors">{formErrors.username}</div>

<div className="pass">
      <input
        placeholder="Create Password"
        name="password"
        type={type}
        onChange={onInputChange}
        value={formValues.password}
      />
      <img src={hidden ? show : hide} onClick={onClickHandler} />
      </div>

      <div className="errors">{formErrors.password}</div>

      <p>Are you a :</p>
      <div className="role">
        <input className="fundraiser" type="radio" name="role" onChange={onInputChange} value="fundraiser" checked={formValues.role === "fundraiser"} />
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
