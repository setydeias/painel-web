import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { 
  setMaskCPF, 
  setMaskCNPJ,
  setMaskTelefone,
  setMaskCep,
} from '../../../utilities/masks';
import { formatDateForType } from '../../../utilities/Utilities'; 
import { 
  createDatabase,
  dropDatabase,
  createTableUserCleint,
  insertTableUserCleint, 
  createTableBeneficiarieCleint, 
  updateDatatableCreated,
  insertTableBeneficiarieCleinte
} from '../../../api/Clients/Clientes';


const PersonDetails = ({ data, setCustomerChanger }) => {

  const databaseStatusDefault = {
      buttonDescription: ' + Base',
      iconSpinner: false
  } 

  const [databaseActions, setDatabaseActions] = useState(databaseStatusDefault);


  const btnCreateDatabase = (e) => {

    e.preventDefault();
    document.getElementById('btn_database').disabled = true;
    createDatabaseCustomer();
  }

  const createDatabaseCustomer = async () => { 

    try {
      
      setDatabaseActions({ 
        ...databaseActions,  
        buttonDescription: ' Criando...',      
        iconSpinner: true,
      });

      const response = await createDatabase(data.id);

      if (response.status === 201) {
        if(
          creteTableUser() &&
          insertTableUser() &&
          createTableBeneficiarie() &&
          insertTableBeneficiarie() &&
          setDatabaseCreated(1)
        ){
          setDatabaseActions({
            ...databaseActions,
            buttonDescription: ' Criada',
            iconSpinner: false,  
          })
        }else{
          setDatabaseActions({
            ...databaseActions,
            buttonDescription: ' + Base',
            iconSpinner: false,  
          })
        }
      }

    } catch (error) {
      alert(error);
      document.getElementById('btn_database').disabled = false;
    }

  }

  const creteTableUser = async () => {
    const response = await createTableUserCleint(data.id);
    if (response.status === 201) {
      return true;
    }
    return false;
  }

  const insertTableUser = async () => {     
    const response = await insertTableUserCleint(data.id);
    if (response.status === 201) {
      return true;     
    }
    return false;
  }

  const createTableBeneficiarie = async () => { 
    const response = await createTableBeneficiarieCleint(data);
    if (response.status === 201) {
      return true;
    }
    return false;  
  }

  const insertTableBeneficiarie = async () => {     
    const response = await insertTableBeneficiarieCleinte(data);
    if (response.status === 201) {
      return true;     
    }
    return false;
  }

  const setDatabaseCreated = async (value) => { 
    const response = await updateDatatableCreated({id: data.id, database_created: value});
      if (response.status === 202) {
        setCustomerChanger((prevent) => ({ ...prevent, database_created: value }));
        return true;        
      }
      setCustomerChanger((prevent) => ({ ...prevent, database_created: 0 }));
      return false;    
  }


  useEffect(()=>{

    if (data.database_created === 1 ) {
      document.getElementById('btn_database').disabled = true;
      setDatabaseActions({
        ...databaseActions,
        buttonDescription: ' Criada',
        iconSpinner: false,  
      })
    }else {
      document.getElementById('btn_database').disabled = false;
      setDatabaseActions({
        ...databaseActions,
        buttonDescription: ' + Base',
        iconSpinner: false,  
      })
    }
  }, [])


  return(
  <form>
    <div className="row g-1"> 
      <div className='d-flex justify-content-between'>
        <h5><i className="fas fa-user-alt text-muted"></i> {data.description}</h5>
        <button
          className='btn btn-light d-flex justify-content-between text-muted'
          id='btn_database'
          name='btn_database'
          onClick={ btnCreateDatabase }
        >
          {
            databaseActions.iconSpinner === true ? 
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                  { databaseActions.buttonDescription } 
                </span>
              : 
              <span>
                <i className="fas fa-database"> </i>
                { databaseActions.buttonDescription }
              </span>
          }
        </button> 
      </div>
    </div>    
    <div className="row g-3">
      <div className="col-auto">
        <label className='form-text text-muted'>{data.document_type === 1 ? 'CPF: ' : 'CNPJ: ' }</label>
        <div>{data.document_type === 1 ? setMaskCPF(data.document) : setMaskCNPJ(data.document) }</div>
        </div>
      <div className="col-auto">
        <label className='form-text text-muted'>Data: </label>
        <div>{ formatDateForType(data.date, 1) }</div>
      </div>
    </div>
    <div className="row g-3">
      <div className="col-auto">
        <label className='form-text text-muted'>Tipo: </label>
        <div>{ data.address_type }</div>
      </div>
      <div className="col-auto">
        <label className='form-text text-muted'>Logradouro: </label>
			  <div>{ data.address }</div>
      </div>
      <div className="col-auto">
        <label className='form-text text-muted'>Nº: </label>
          <div>{ data.address_number }</div>
      </div>
      <div className="col-auto">
        <label className='form-text text-muted'>Bairro: </label>
        <div>{ data.district }</div>
      </div>      
    </div>
    <div className='row g-3'>
      <div className="col-auto">
        <label className='form-text text-muted'>Cidade: </label>
        <div>{ data.city }</div>
      </div>
      <div className="col-auto">
        <label className='form-text text-muted'>UF: </label>
        <div>{ data.uf }</div>
      </div>
      <div className="col-auto">
        <label className='form-text'>CEP: </label>
        <div>{ setMaskCep(data.cep) }</div>
      </div>      
    </div>
    <div className='row g-3'>
      <div className="col-auto">
        <label className='form-text text-muted'>Contato: </label>
        <div>{ setMaskTelefone(data.phone_number1) }</div>
      </div>
      <div className="col-auto">
        <label className='form-text text-muted'>Email: </label>
        <div>{ data.email1 }</div>
      </div>
    </div>
  </form>
  )
}

export default PersonDetails;