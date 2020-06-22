import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export const useDarkMode = (initialState) => {
    const [darkModeState, setDarkModeState] = useLocalStorage("darkMode", initialState);

    const toggleMode = e => {
        e.preventDefault();
        setDarkModeState(!darkModeState);
      };

    return [darkModeState, setDarkModeState, toggleMode]
}