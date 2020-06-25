import { useState } from "react";

export const useShowPassword = () => {
    const [type, setType] = useState("password");
    const [hidden, setHidden] = useState(true);

    const onClickHandler = e => {
        e.preventDefault();

        if(type === "text") {
            setType("password");
            setHidden(true)
        } else {
            setType("text");
            setHidden(false);
        }
    }

    return [type, hidden, onClickHandler];
}