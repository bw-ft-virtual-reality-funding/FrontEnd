import React, { useState } from "react";
import { Link } from "react-router-dom";
import signUpFormSchema from './validation/signUpFormSchema'
import * as yup from "yup";
import axios from "axios";

const initialVal = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

const initialErr = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

const newUser = [];

export default function Signup() {
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState(newUser);
  const [formValues, setFormValues] = useState(initialVal);
  const [formErrors, setFormErrors] = useState(initialErr);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    yup
      .reach(signUpFormSchema, name)
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

  return (
    <div>
      <form>
        <h1>Sign Up</h1>
        <h3>Create your account.</h3>

        <label htmlFor="firstname">
          First Name&nbsp;
          <input name="firstname" type="text" />
        </label>
        <label htmlFor="lastname">
          Last Name&nbsp;
          <input name="lastname" type="text" />
        </label>

        <label htmlFor="email">
          Email&nbsp;
          <input name="email" type="email" />
        </label>

        <label htmlFor="username">
          Email&nbsp;
          <input name="username" type="text" />
        </label>

        <label htmlFor="password">
          Password&nbsp;
          <input name="password" type="password" />
        </label>

        <div>
          <button disabled={disabled}>Sign Up Now</button>
        </div>

        <div className="errors">
          <div></div>
          <div></div>
        </div>
      </form>

      <div>
        Already have an account?<Link to="/">Login</Link>{" "}
      </div>
    </div>
  );
}
