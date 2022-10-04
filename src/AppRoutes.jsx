import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth';
import LogOut from './pages/LogOut';
import Customer from './pages/Customer';
import CustomerRegister from './pages/Customer/Register';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import { AuthContext } from './provider/auth';
//import { AuthProvider } from './contexts/auth';

const AppRoutes = () => {

  const menuShow = useContext(AuthContext);

  return (  
    <Router>
        <Routes>      
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/admin" element={ 
            <PrivateRoute>
              <Menu/>
              <Dashboard /> 
            </PrivateRoute>
          } />
          <Route exact path="/customer" element={ 
            <PrivateRoute>
               <Menu/>
              <Customer />
            </PrivateRoute> 
          } />
          <Route exact path="/customer/register" element={ 
            <PrivateRoute>
              <Menu/>
              <CustomerRegister /> 
            </PrivateRoute>              
          } />
          <Route exact path="/logout" element={ 
             <PrivateRoute>
               <LogOut /> 
             </PrivateRoute>
          } />
          <Route path='*' element={ 
            <PrivateRoute>
              <NotFound /> 
          </PrivateRoute>        
          } />
        </Routes>
    </Router>
  );
}

export default AppRoutes;
 
   