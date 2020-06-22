import React, { useState } from "react";
import { Link } from 'react-router-dom'

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

  return <div>
      <form>
          <h1>Login</h1>
          
          <label htmlFor="username">
              Username&nbsp;
              <input name="username" type="text"/>
          </label>

          <label htmlFor="password">
              Password&nbsp;
              <input name="password" type="password"/>
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
