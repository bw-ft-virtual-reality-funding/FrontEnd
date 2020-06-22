import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import signUpFormSchema from "./validation/signUpFormSchema";
import * as yup from "yup";
import axios from "axios";

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

  const postNewUser = (newUser) => {
    axios
      .post("URL")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const onSubmit = (e) => {
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
      signUpFormSchema.isValid(formValues).then((valid) => {
          //if form values meet validation enable the button
          setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <h3>Create your account.</h3>

        <label htmlFor="firstname">
          First Name&nbsp;
          <input name="firstname" type="text" onChange={onInputChange} value={formValues.firstname}/>
        </label>
        <div>{formErrors.firstname}</div>


        <label htmlFor="lastname">
          Last Name&nbsp;
          <input name="lastname" type="text" onChange={onInputChange} value={formValues.lastname}/>
        </label>
        <div>{formErrors.lastname}</div>


        <label htmlFor="email">
          Email&nbsp;
          <input name="email" type="email" onChange={onInputChange} value={formValues.email} />
        </label>
        <div>{formErrors.email}</div>


        <label htmlFor="username">
          Email&nbsp;
          <input name="username" type="text" onChange={onInputChange} value={formValues.username} />
        </label>
        <div>{formErrors.username}</div>


        <label htmlFor="password">
          Password&nbsp;
          <input name="password" type="password" onChange={onInputChange} value={formValues.password} />
        </label>
        <div>{formErrors.password}</div>



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
