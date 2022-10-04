import React from 'react';
import './styles.css';
import { Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';


const AlertMessage = ({ text, visible, clearInfo }) => {
  
  if(text === 'Número não cadastrado.'){
    return (
      <Alert color="light" className="text-color-red" isOpen={visible}>
       { text + ' Deseja cadastrar?' } 
       <NavLink exact to="/contato"> Sim</NavLink>
       <NavLink onClick={ clearInfo }  exact to="#"> Não</NavLink>
      </Alert>
    )
  }
  else {
    return (
      <Alert color="light" className="text-color-red" isOpen={visible}>
        { text  }
      </Alert>
    )
  }
  
};

export default AlertMessage;