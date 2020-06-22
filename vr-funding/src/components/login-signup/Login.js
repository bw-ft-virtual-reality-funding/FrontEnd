import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup'
import loginFormSchema from './validation/loginFormSchema'
import axios from 'axios'

const initialVal = {
    username: '',
    password: '',
}

const initialErr = {
    username: '',
    password: '',
}

const initialDisabled = true;

export default function Login() {
const [disabled, setDisabled] = useState(initialDisabled);
const [formValues, setFormValues] = useState(initialVal)
const [formErrors, setFormErrors] = useState(initialErr)
    
let history = useHistory();

const onSubmitHandler = e => {
        axiosWithAuth()
        .post(`URL`, )
    }

const loginUser = (newUser) => {
    axios.post("https://regres.in/api/users", newUser)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        setFormValues(initialVal)
    })
}

const onInputChange = (e) => {
    const { name, value } = e.target;
    
    yup.reach(loginFormSchema, name)
        .validate(value)
        .then((valid) => {
            setFormErrors({
                ...formErrors,
                [name]: "",
            })
        })
        .catch((err) => {
            setFormErrors({
                ...formErrors,
                [name]: err.errors[0],
            })
        })
        setFormValues({
            ...formValues,
            [name]: value,
        })
}

const onSubmit = e => {
    e.preventDefault();

    const user = {
        username: formValues.username.trim(),
        password: formValues.password.trim(),
    }
    loginUser(user);
}

useEffect(() => {
    loginFormSchema.isValid(formValues).then((valid) => {
        //if values meet validation, enable the login button
        setDisabled(!valid)
    })
}, [formValues])

  return <div>
      <form onSubmit={onSubmit}>
          <h1>Login</h1>
          
          <label htmlFor="username">
              Username&nbsp;
              <input name="username" type="text" onChange={onInputChange} value={formValues.username} />
          </label>

          <label htmlFor="password">
              Password&nbsp;
              <input name="password" type="password" onChange={onInputChange} value={formValues.password} />
          </label>

          <div>
              <button disabled={disabled}>Login</button>
          </div>

          <div className="errors">
              <div>{formErrors.username}</div>
              <div>{formErrors.password}</div>
          </div>
      </form>

      <div>Don't have an account yet?<Link to="/Signup">Sign Up</Link> </div>
  </div>;
}
