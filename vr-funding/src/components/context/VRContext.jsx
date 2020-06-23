import React from "react";
import { createContext, useState} from "react";


export const VRContext = createContext();

export const VRProvider = props => {
    const [userDetails, setUserDetails] = useState({});
    
    return (
        <VRContext.Provider
        value={[userDetails, setUserDetails]}
        >
            {props.children}
        </VRContext.Provider>
    )
}