import React from "react";
import Nav from "./nav";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "./styles/css/index.css";

function App() {
	return <div className="App">
    <Router>

     {/* HOME PAGE -- SIGNUP & LOGIN  */}
      <Route path="/" exact>
        <Nav />
      </Route>

      { /*  DASHBOARD  */ }
      <Route >

      </Route>
    </Router>
  </div>;
}

export default App;
