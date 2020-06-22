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

const initialUser = [];


export default function Login() {
const [disabled, setDisabled] = useState(true);
const [user, setUser] = useState(initialUser);
const [formValues, setFormValues] = useState(initialVal)
const [formErrors, setFormErrors] = useState(initialErr)
    


const onSubmitHandler = e => {
        axiosWithAuth()
        .post(`URL`, )
    }

const postUser = (newUser) => {
    axios.post("https://regres.in/api/users", newUser)
    .then((response) => {
        setUser([...user, response.data]);
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

  return <div>
      <form >
          <h1>Login</h1>
          
          <label htmlFor="username">
              Username&nbsp;
              <input name="username" type="text" />
          </label>

          <label htmlFor="password">
              Password&nbsp;
              <input name="password" type="password" />
          </label>

          <div>
              <button disabled={disabled}>Login</button>
          </div>

          <div className="errors">
              <div></div>
              <div></div>
          </div>
      </form>

      <div>Don't have an account yet?<Link to="/Signup">Sign Up</Link> </div>
  </div>;
}
