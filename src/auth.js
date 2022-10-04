import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuth = () => {
   
    if (localStorage.getItem('token') !== null) {
        return true;
    }   
    return false;
};

const PrivateRoute = ({children }) => {

    if(!isAuth()) {
        return <Navigate 
            to={{
                pathname: '/',
                state: { message: 'Usuário não autorizado.' }
            }}
        />
    }
    return children;
}

export default PrivateRoute;