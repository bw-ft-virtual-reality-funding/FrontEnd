import React from "react";
import logo from "./styles/images/VRFP_logo.png";
import { Link } from 'react-router-dom'

const Nav = props => {
    return (
        <nav id="navBar">
            <img id="logo" src="images/logo.png" />
                <a href="index.html"> Home</a>
                <a href="about.html"> About Us </a>
                <a href="/"> Login </a>
                <a href="/signup"> Signup </a>
        </nav>
    )
}

export default Nav;