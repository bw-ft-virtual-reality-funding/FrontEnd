import React, { useState } from "react";

export const useShowPassword = () => {
    const [hidden, setHidden] = useState("password");

    const onClickHandler = e => {
        e.preventDefault();

        if(hidden === "text") {
            setHidden("password");
        } else {
            setHidden("text");
        }
    }

    return [hidden, onClickHandler];
}