import React, { useContext, useEffect } from "react";
import { VRContext } from "../context/VRContext";
import logo from "../styles/images/VRFP_logo.png";
import { useDarkMode } from "./hooks/useDarkMode";

const DashNav = props => {
    const [userDetails, setUserDetails] = useContext(VRContext)
    const [darkMode, setDarkMode, toggle] = useDarkMode(false);

    useEffect(() => {
        const body = document.querySelector("body");

        if (darkMode) {
            body.classList.add("dark");
        } else {
            body.classList.remove("dark");
        }

    }, [darkMode])

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location.assign("/");
    }

    return (
        <nav id="dashNav">
            <img
                id="logo"
                src={logo}
                onClick={() => {
                    logOut();
                    window.location.assign("https://vrfundingplatform.netlify.app/");
                }}
            />
            <input
                type="checkbox"
                name="darkMode"
                id="darkMode"
                onClick={toggle}
                checked={darkMode}
            />
            {userDetails.role === "fundraiser"
                ? <a href="/dashboard/add">Add Project</a>
                : <a href="/dashboard/view">Fund Project</a>
            }
            <a href="/dashboard/profile">{userDetails.username}</a>
            <a className="signout" onClick={logOut}>Sign Out</a>
        </nav>
    )
}

export default DashNav;