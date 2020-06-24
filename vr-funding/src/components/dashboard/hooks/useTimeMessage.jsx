import React, { useEffect, useState } from "react";

export const useTimeMessage = (morning, afternoon) => {
    const date = new Date();
    const time = (date.getHours());
    const [greet, setGreet] = useState("");

    useEffect(() => {
            if (time >= 12) {
                setGreet(afternoon);
            } else if (time < 12) {
                setGreet(morning);
            }
    }, []);

    return [greet]
}