import React, { useContext } from "react";
import './style.css';
import { CustomerContext } from "../../../Contexts/Customer/CustomerContext";
import { maskMoney2 } from "../../../utilities/masks";

const PersonBankData = (props) => {
    const { formStatus, setFormStatus } = useContext(CustomerContext);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      props.setCustomer({ ...props.customer, [name]: value });
    };

    const handleChangeMaskMoney = (e) => {
      e.preventDefault();
      maskMoney2(e);
      props.setCustomer({ ...props.customer, [e.target.name]: e.target.value });
    };
    


    return(
      <>
        <div className="row">
          <div className="col-md-2 mb-3">
            <label>Conta crédito<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.bank.validate} 
              id="bank"
              name="bank" 
              value={ props.customer.bank }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
            >
              <option value=''></option>
              <option value='001 - Banco do Brasil'>001 - Banco do Brasil</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.id_application_bb.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Agência<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.bank_agency.validate} 
              id="bank_agency"
              name="bank_agency" 
              value={ props.customer.bank_agency }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              maxLength={8}
              />
            <div className="invalid-feedback">
              { formStatus.bank.bank_agency } 
            </div>
          </div>    
          <div className="col-md-2 mb-3">
            <label>Nº da conta<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.bank_number_account.validate} 
              id="bank_number_account"
              name="bank_number_account" 
              value={ props.customer.bank_number_account }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              maxLength={12}
              />
            <div className="invalid-feedback">
              { formStatus.bank_number_account.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Convênio<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_convenio.validate} 
              id="number_convenio"
              name="number_convenio" 
              value={ props.customer.number_convenio }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              maxLength={7}
              />
            <div className="invalid-feedback">
              { formStatus.number_convenio.erro } 
            </div>
          </div>        
          <div className="col-md-2 mb-3">
            <label>Nº Carteira<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_wallet.validate} 
              id="number_wallet"
              name="number_wallet" 
              value={ props.customer.number_wallet }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.number_wallet.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Nº variação<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_wallet_variation.validate} 
              id="number_wallet_variation"
              name="number_wallet_variation" 
              value={ props.customer.number_wallet_variation }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              maxLength={3}
              />
            <div className="invalid-feedback">
              { formStatus.number_wallet_variation.erro } 
            </div>
          </div>                                     
        </div>
        <div  className="complementary_data"> Dados complementares</div>
        <div className="row">          
          <div className="col-md-2 mb-3">
            <label>Descricao tipo<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.description_type_title.validate} 
              id="description_type_title"
              name="description_type_title" 
              value={ props.customer.description_type_title }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
              />
            <div className="invalid-feedback">
              { formStatus.description_type_title.erro } 
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label>Nº dias limite<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.number_receipt_limit_days.validate} 
              id="number_receipt_limit_days"
              name="number_receipt_limit_days" 
              value={ props.customer.number_receipt_limit_days }
              onChange={ handleChange }
              onBlur=''
              //required  
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
              //required  
              placeholder=''
            >
              <option value=''></option>
              <option value={0}>Sem multa</option>
              <option value={1}>Valor fixo R$</option>
              <option value={2}>Percentual %</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.type_multa.erro } 
            </div>
          </div>
          {
            props.customer.type_multa !== '0' ? <div className="col-md-2 mb-3">
              <label>Valor<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.multa_value.validate} 
                id="multa_value"
                name="multa_value" 
                value={ props.customer.multa_value.toLocaleString('pt-br', {minimumFractionDigits: 2}) }
                onChange={ handleChangeMaskMoney }
                onBlur=''
                //required  
                placeholder=''
                />
              <div className="invalid-feedback">
                { formStatus.multa_value.erro } 
              </div>
            </div> : ''
          }          
          <div className="col-md-2 mb-3">
            <label>Tipo de juros<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.type_juros_mora.validate} 
              id="type_juros_mora"
              name="type_juros_mora" 
              value={ props.customer.type_juros_mora }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
            >
              <option value=''></option>
              <option value={0}>Sem juros</option>
              <option value={1}>Fixo por dia R$</option>
              <option value={2}>Taxa mensal %</option>
              <option value={3}>Isento</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.type_juros_mora.erro } 
            </div>
          </div>
          {
            props.customer.type_juros_mora !== '0' ? <div className="col-md-2 mb-3">
              <label>Valor<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.juros_mora_value.validate} 
                id="juros_mora_value"
                name="juros_mora_value" 
                value={ props.customer.juros_mora_value.toLocaleString('pt-br', {minimumFractionDigits: 2}) }
                onChange={ handleChangeMaskMoney }
                onBlur={() =>{ console.log(props.customer) } }
                //required  
                placeholder=''
                />
              <div className="invalid-feedback">
                { formStatus.juros_mora_value.erro } 
              </div>
            </div> : ''
          }
          
        </div>  
        <div className="row">
        <div className="col-md-2 mb-3">
            <label>Indicador Pix<span className='required_field'> *</span></label>
            <select 
              type="text" 
              className={formStatus.pix_indicator.validate} 
              id="pix_indicator"
              name="pix_indicator" 
              value={ props.customer.pix_indicator }
              onChange={ handleChange }
              onBlur=''
              //required  
              placeholder=''
            >
              <option value=''></option>
              <option value='S'>Sim</option>
              <option value='N'>Não</option>
            </select>
            <div className="invalid-feedback">
              { formStatus.pix_indicator.erro } 
            </div>
          </div>
          {
            props.customer.pix_indicator === 'S' ? <div className="col-md-4 mb-3">
              <label>Pix beneficiário<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.text_email_address.validate} 
                id="text_email_address"
                name="text_email_address" 
                value={ props.customer.text_email_address }
                onChange={ handleChange }
                onBlur={() =>{ console.log(props.customer) } }
                //required  
                placeholder=''
              />
              <div className="invalid-feedback">
                { formStatus.text_email_address.erro } 
              </div>
            </div> : ''
          }
          
        </div>
      </>
    )

}

export default PersonBankData;