import React from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const DashNav = props => {
    const [darkMode, setDarkMode, toggle] = useDarkMode(false);
    return (
        <nav></nav>
    )
}

export default DashNav;