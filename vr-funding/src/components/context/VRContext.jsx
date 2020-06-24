import React from "react";
import { createContext, useState} from "react";


export const VRContext = createContext();

export const VRProvider = props => {
    const [userDetails, setUserDetails] = useState({});
    const [currentProject, setCurrentProject] = useState({});
    
    return (
        <VRContext.Provider
        value={[userDetails, setUserDetails, currentProject, setCurrentProject]}
        >
            {props.children}
        </VRContext.Provider>
    )
}