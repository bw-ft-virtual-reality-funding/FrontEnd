import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import logo from "./styles/images/VRFP_logo.png";
import "./styles/less/index.less";

function App() {
	return <div className="App">
    <Router>

     {/* HOME PAGE -- SIGNUP & LOGIN  */}
      <Route path="/" exact>
          <img src={logo} alt=""/>
      </Route>

      { /*  DASHBOARD  */ }
      <Route >

      </Route>
    </Router>
  </div>;
}

export default App;
