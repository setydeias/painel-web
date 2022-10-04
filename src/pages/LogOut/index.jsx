import { useState, useContext } from 'react';
import { AuthContext } from '../../provider/auth';

const LogOut = (props) => {
    
    const menuShow = useContext(AuthContext);

    useState(()=> {

        localStorage.removeItem('token');
        localStorage.removeItem('description_user');
        menuShow.setMenuShow(false);
        window.location.href ='/';
    }, []) 
    
    return null;
}

export default LogOut;