import React from "react";
import logo from "./styles/images/VRFP_logo.png";
import { Link } from 'react-router-dom'

const Nav = props => {
    return (
        <nav>
            <img className="logo" src={logo} />
            <div>
                <Link to="./Login">Login</Link>
                <Link to="./Signup">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Nav;