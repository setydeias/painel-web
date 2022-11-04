import React, { useContext } from "react";
import { CustomerContext } from "../../../Contexts/Customer/CustomerContext";

const PersonBankData = (props) => {
    const { formStatus, setFormStatus } = useContext(CustomerContext);

    return(
      <>
        <div className="row">
        <div className="col-md-3 mb-3">
            <label>Id da aplicação<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.id_application_bb.validate} 
              id="id_application_bb"
              name="id_application_bb" 
              value={ props.customer.id_application_bb }
              onChange=''
              onBlur=''
              required  
              placeholder='Para o suporte junto ao BB'
              />
            <div className="invalid-feedback">
              { formStatus.id_application_bb.erro } 
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label>Noma da aplicação<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.name_application_bb.validate} 
              id="name_application_bb"
              name="name_application_bb" 
              value={ props.customer.name_application_bb }
              onChange=''
              onBlur=''
              required  
              placeholder='Nome da aplicação pp.developers.bb'
              />
            <div className="invalid-feedback">
              { formStatus.name_application_bb.erro } 
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label>Credencial<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.name_application_bb.validate} 
              id="name_application_bb"
              name="name_application_bb" 
              value={ props.customer.name_application_bb }
              onChange=''
              onBlur=''
              required  
              placeholder='É a credencial para acionar as APIS do BB'
              />
            <div className="invalid-feedback">
              { formStatus.name_application_bb.erro } 
            </div>
          </div>
        </div>
        <div className="row">          
          <div className="col-md-12 mb-3">
            <label>Credencial OAuth<span className='required_field'> *</span></label>
            <input 
              type="text" 
              className={formStatus.client_id.validate} 
              id="client_id"
              name="client_id" 
              value={ props.customer.client_id }
              onChange=''
              onBlur=''
              required  
              placeholder='É o identificador público e único no OAuth do Banco do Brasil.'
              />
            <div className="invalid-feedback">
              { formStatus.client_id.erro } 
            </div>
          </div>
        </div>
        <div className="row">  
          <div className="col-md-12 mb-3">
            <label>Credencial secreta<span className='required_field'> *</span></label>
            <textarea 
              type="text" 
              className={formStatus.client_secret.validate} 
              id="client_id"
              name="client_id" 
              value={ props.customer.client_secret }
              onChange=''
              onBlur=''
              required  
              placeholder='É conhecido apenas para sua aplicação e o servidor de autorização.'
              />
            <div className="invalid-feedback">
              { formStatus.client_secret.erro } 
            </div>
          </div>   
        </div>
        <div className="row">  
          <div className="col-md-12 mb-3">
            <label>Cópia básica<span className='required_field'> *</span></label>
            <textarea 
              type="text" 
              className={formStatus.basic_copy.validate} 
              id="client_id"
              name="client_id" 
              value={ props.customer.basic_copy }
              onChange=''
              onBlur=''
              required  
              placeholder='É conhecido apenas para sua aplicação e o servidor de autorização.'
              />
            <div className="invalid-feedback">
              { formStatus.basic_copy.erro } 
            </div>
          </div>   
        </div>
      </>
    )

}

export default PersonBankData;