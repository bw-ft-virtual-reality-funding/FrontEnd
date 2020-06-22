import React from "react";
import { createContext, useState} from "react";


export const VRContext = createContext();

export const VRProvider = props => {
    const [fundraisers, setFundraisers] = useState([]);
    
    return (
        <VRContext.Provider
        value={[fundraisers, setFundraisers]}
        >
            {props.children}
        </VRContext.Provider>
    )
}