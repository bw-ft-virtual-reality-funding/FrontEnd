import React from "react";
import Nav from "./nav";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./styles/css/index.css";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        {/* HOME PAGE -- SIGNUP & LOGIN  */}
        <Route path="/" exact>
          <Nav />
          <Login />
        </Route>
        <Route path="/Signup">
          <Signup />
        </Route>

        {/*  DASHBOARD  */}
        <PrivateRoute path="/dashboard"></PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
