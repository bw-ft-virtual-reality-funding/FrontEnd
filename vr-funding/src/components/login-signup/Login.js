import React from "react";
import { Link } from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Login() {
    const onSubmitHandler = e => {
        axiosWithAuth()
        .post(`URL`, )
    }

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
              <button>Login</button>
          </div>

          <div className="errors">
              <div></div>
              <div></div>
          </div>
      </form>

      <div>Don't have an account yet?<Link to="/Signup">Sign Up</Link> </div>
  </div>;
}
