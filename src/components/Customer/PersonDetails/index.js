import React, { useState } from 'react';
import './style.css';
import { 
  setMaskCPF, 
  setMaskCNPJ,
  setMaskTelefone,
  setMaskCep,
  setMaskCnae
} from '../../../utilities/masks';
import { formatDateForType } from '../../../utilities/Utilities';

const PersonDetails = ({data}) => {

  const [databaseIcon, setDatabaseIcon] = useState(true);

  return(
  <form>
    <div className="row g-1"> 
      <div className='d-flex justify-content-between'>
        <h5><i className="fas fa-user-alt text-muted"></i> {data.description}</h5>
        <div className="btn btn-light d-flex justify-content-between text-muted">
          {
            databaseIcon === true ? 
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                Criando... 
              </span> : 
              <i className="fas fa-database"> +Base</i>
          }
        </div> 
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