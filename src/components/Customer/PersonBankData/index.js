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
          </div>    <div className="col-md-3 mb-3">
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
      </>
    )

}

export default PersonBankData;