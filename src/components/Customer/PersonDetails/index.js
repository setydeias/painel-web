import React from 'react';
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

  return(
    <form>
      <h5>{data.description}</h5>
      <div className="form-group row" >        
        <div className="form-group">
          <small className='form-text text-muted'>{data.document_type === 1 ? 'CPF: ' : 'CNPJ: ' }</small>
          <label>{data.document_type === 1 ? setMaskCPF(data.document) : setMaskCNPJ(data.document) }</label>
        </div>
        <div className="form-group">
          <small className='form-text text-muted'>Data: </small>
          <label>{ formatDateForType(data.date, 1) }</label>
        </div>       
      </div>
      <div className="row">
        <div className="form-group">
          <small className='form-label text-muted'>Tipo: </small>
          <label>{ data.address_type }</label>
        </div>
        <div className="form-group">
          <small className='form-text text-muted'>Logradouro: </small>
          <label>{ data.address }</label>
        </div> 
        <div className="form-group">
          <small className='form-text text-muted'>Nº: </small>
          <label>{ data.address_number }</label>
        </div>
        <div className="form-group">
          <small className='form-text text-muted'>Bairro: </small>
          <label>{ data.district }</label>
        </div>           
      </div>
      <div className="form-group row">           
        <div className="form-group">
          <small className='form-text text-muted'>Cidade: </small>
          <label>{ data.city }</label>
        </div>
        <div className="form-group">
          <small className='form-text text-muted'>UF: </small>
          <label>{ data.uf }</label>
        </div>  
        <div className="form-group">
          <small className='form-text'>CEP: </small>
          <label>{ setMaskCep(data.cep) }</label>
        </div>
        <div className="form-group">
          <small className='form-text text-muted'>Contato: </small>
          <label>{ setMaskTelefone(data.phone_number1) }</label>
        </div>      
      </div>
      <div className="form-group row">
        <div className="form-group">
          <small className='form-text text-muted'>Email: </small>
          <label>{ data.email1 }</label>
        </div>
      </div>
    </form>
  )
}

export default PersonDetails;