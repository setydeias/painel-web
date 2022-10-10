import { useState } from 'react';

const LogOut = (props) => {
    
    useState(()=> {

        localStorage.removeItem('token');
        localStorage.removeItem('description_user');
        window.location.href ='/';
    }, []) 
    
    return null;
}

export default LogOut;