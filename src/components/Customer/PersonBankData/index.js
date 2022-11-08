import React, { useContext } from "react";
import { CustomerContext } from "../../../Contexts/Customer/CustomerContext";

const PersonBankData = (props) => {
    const { formStatus, setFormStatus } = useContext(CustomerContext);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      props.setCustomer({ ...props.customer, [name]: value });
    };



    return(
      <>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Banco da conta cródito<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.bank.validate} 
              id="bank"
              name="bank" 
              value={ props.customer.bank }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
            >
              <option value=''></option>
              <option value='001 - Banco do Brasil'>001 - Banco do Brasil</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.id_application_bb.erro } 
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label>Agência<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.bank_agency.validate} 
              id="bank_agency"
              name="bank_agency" 
              value={ props.customer.bank_agency }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.bank.bank_agency } 
            </div>
          </div>    
          <div className="col-md-3 mb-3">
            <label>Número da conta<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.bank_number_account.validate} 
              id="bank_number_account"
              name="bank_number_account" 
              value={ props.customer.bank_number_account }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.bank_number_account.erro } 
            </div>
          </div>                           
        </div>
        <div className="row">  
          <div className="col-md-3 mb-3">
            <label>Convênio<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_convenio.validate} 
              id="number_convenio"
              name="number_convenio" 
              value={ props.customer.number_convenio }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.number_convenio.erro } 
            </div>
          </div>        
          <div className="col-md-3 mb-3">
            <label>Nº Carteira<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_wallet.validate} 
              id="number_wallet"
              name="number_wallet" 
              value={ props.customer.number_wallet }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.number_wallet.erro } 
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label>Nº variação<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_wallet_variation.validate} 
              id="number_wallet_variation"
              name="number_wallet_variation" 
              value={ props.customer.number_wallet_variation }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.number_wallet_variation.erro } 
            </div>
          </div>          
        </div>
        <div  style={{color: 'gray'}}> Dados para os títulos</div>
        <div className="row">          
          <div className="col-md-3 mb-3">
            <label>Descricao tipo do Titulo<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.description_type_title.validate} 
              id="description_type_title"
              name="description_type_title" 
              value={ props.customer.description_type_title }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.description_type_title.erro } 
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label>Nº dias limite recebimento do título<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_receipt_limit_days.validate} 
              id="number_receipt_limit_days"
              name="number_receipt_limit_days" 
              value={ props.customer.number_receipt_limit_days }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.number_receipt_limit_days.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Tipo de multa<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.type_multa.validate} 
              id="type_multa"
              name="type_multa" 
              value={ props.customer.type_multa }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
            >
              <option value=''></option>
              <option value='Sem multa'>Sem multa</option>
              <option value='Valor fixo R$'>Valor fixo R$</option>
              <option value='Percentual %'>Percentual %</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.type_multa.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Valor<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.multa_value.validate} 
              id="multa_value"
              name="multa_value" 
              value={ props.customer.multa_value }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.multa_value.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Tipo de juros<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.type_juros.validate} 
              id="type_juros"
              name="type_juros" 
              value={ props.customer.type_juros }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
            >
              <option value=''></option>
              <option value='Sem juros'>Sem juros</option>
              <option value='Valor por dia R$'>Valor fixo R$</option>
              <option value='Taxa mensal %'>Taxa mensal %</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.type_juros.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Valor<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.juros_value.validate} 
              id="juros_value"
              name="juros_value" 
              value={ props.customer.juros_value }
              onChange={ handleChange }
              onBlur=''
              required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.juros_value.erro } 
            </div>
          </div>
        </div>  
      </>
    )

}

export default PersonBankData;