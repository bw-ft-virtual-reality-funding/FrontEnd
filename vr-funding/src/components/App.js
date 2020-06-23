import React from "react";
import Nav from "./nav";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./styles/css/index.css";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";
import { VRProvider } from "./context/VRContext";
import FundraiserForm from "./dashboard/fundraiser/FundraiserForm"
import Dashboard from "./dashboard/dashboard";

function App() {
  return (
    <VRProvider>
      <div className="App">
        <Router>
          {/* HOME PAGE -- SIGNUP & LOGIN  */}
          <Nav />
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>

          {/*  DASHBOARD  */}
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Router>
      </div>
    </VRProvider>
  );
}

export default App;
