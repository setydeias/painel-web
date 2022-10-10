import React, { useState, createContext } from "react";

export const CustomerContext = createContext()

export const CustomerContextProvider = ({ children }) => {
    
    const [menuShow, setMenuShow ] = useState('TESTE')

    return(
        <CustomerContext.Provider value={{ menuShow, setMenuShow }}> 
            { children }
        </CustomerContext.Provider>
    );
}; 