import React from "react";
import Nav from "./nav";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./styles/css/index.css";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        {/* HOME PAGE -- SIGNUP & LOGIN  */}
        <Route path="/" exact>
          <Nav>
            <Link to="/Login">Login</Link>
          </Nav>
        </Route>

        {/*  DASHBOARD  */}
        <PrivateRoute path="/dashboard"></PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
