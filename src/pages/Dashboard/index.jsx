import React from 'react';
import './style.css';
import { CustomerContextProvider } from '../../Contexts/Customer/CustomerContext';

const Dashboard = () => {

  return(
    <CustomerContextProvider>
      
    </CustomerContextProvider>
  )
}
export default Dashboard;