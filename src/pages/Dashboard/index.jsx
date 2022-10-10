import React from 'react';
import './style.css';
import { CustomerContextProvider } from '../../Contexts/Customer/CustomerContext';
import Test from "../../components/Test";

const Dashboard = () => {

  return(
    <CustomerContextProvider>
     <Test />
    </CustomerContextProvider>
  )
}
export default Dashboard;