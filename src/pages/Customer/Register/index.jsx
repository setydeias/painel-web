import React, { useState, useEffect } from 'react';
import '../../../styles.css';
import RegisterCustumer from '../../../components/Customer/Register';
import { CustomerContextProvider } from '../../../Contexts/Customer/CustomerContext';

const CustomerRegister = (props) => {
  
  const [action, setAction] = useState('create')
  const [testDocumentExist, setTestDocumentExist] = useState(props.document);

  useEffect(() => { 
    if (!props.action === undefined) {      
      setAction(props.action);
    }

  }, [])

  return(
    <CustomerContextProvider>
      <RegisterCustumer 
        action={ action } 
        setAction={setAction} 
        document={testDocumentExist} 
        setTestDocumentExist={ setTestDocumentExist } 
      />
    </CustomerContextProvider>
  )
}
export default CustomerRegister;