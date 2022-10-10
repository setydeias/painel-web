import { useState, useContext } from 'react';
import { AuthContext } from '../../provider/auth';

const LogOut = (props) => {
    
    useState(()=> {

        localStorage.removeItem('token');
        localStorage.removeItem('description_user');
        window.location.href ='/';
    }, []) 
    
    return null;
}

export default LogOut;