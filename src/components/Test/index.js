import React, { useContext } from "react";
import { CustomerContext } from "../../Contexts/Customer/CustomerContext";

const Test = () => { 

    const { menuShow } = useContext(CustomerContext)

    return(
        <p>
            Valor: { menuShow }
        </p>
    )
}

export default Test;