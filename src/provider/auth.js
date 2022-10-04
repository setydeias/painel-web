import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    
    const [menuShow, setMenuShow ] = useState(false)

    return(
        <AuthContext.Provider value={{ menuShow, setMenuShow }}> 
            { props.children }
        </AuthContext.Provider>
    );
}; 