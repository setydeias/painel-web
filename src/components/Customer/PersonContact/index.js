import React, { useContext } from 'react';
import { 
  noMask, 
  maskTelefone,
 setMaskTelefone
} from '../../../utilities/masks';
import { 
    isValidEMail,
    testValidPhone,
    isSite,
} from '../../../utilities/Utilities';

import { CustomerContext } from '../../../Contexts/Customer/CustomerContext';


const PersonContact = (props) => { 

    const { formStatus, setFormStatus } = useContext(CustomerContext);

    var references = {
      site: document.getElementById('site'),    
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      props.setCustomer({ ...props.customer, [name]: value });
    };

    const handleChangeChecked = (e) => {
      const { name, checked } = e.target;
      props.setCustomer({ ...props.customer, [name]: checked });
    };

    const handleChangePhone = (e) => {    
    
      e.preventDefault();
      maskTelefone(e);
      props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
    };

    const testPhone1 = () => {
        if (!props.customer.phone_number1) {
          setFormStatus({...formStatus, 
            phone_number1: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;    
        }
        if(!testValidPhone(noMask(props.customer.phone_number1))){
          setFormStatus({...formStatus, 
            phone_number1: {
              erro: 'Telefone inválido!',
              validate: 'form-control is-invalid'
            }
          });
          return false; 
        }
        setFormStatus({...formStatus, 
          phone_number1: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testPhone2 = () => {    
        if(props.customer.phone_number2.length > 0){
          if(!testValidPhone(noMask(props.customer.phone_number2))){
            setFormStatus({...formStatus, 
              phone_number2: {
                erro: 'Telefone inválido!',
                validate: 'form-control is-invalid'
              }
            });
            return false; 
          }
          setFormStatus({...formStatus, 
            phone_number2: {
              erro: '',
              validate: 'form-control is-valid'
            }
          });
          return true;      
        }
        setFormStatus({...formStatus, 
          phone_number2: {
            erro: '',
            validate: 'form-control'
          }
        });
        return true;
      }
    
      const testPhone3 = () => {
        if(props.customer.phone_number3) {
          if(!testValidPhone(noMask(props.customer.phone_number3))){
            setFormStatus({...formStatus, 
              phone_number3: {
                erro: 'Telefone inválido!',
                validate: 'form-control is-invalid'
              }
            });
            return false; 
          }
          setFormStatus({...formStatus, 
            phone_number3: {
              erro: '',
              validate: 'form-control is-valid'
            }
          });
          return true;
        }
        setFormStatus({...formStatus, 
          phone_number3: {
            erro: '',
            validate: 'form-control'
          }
        });
        return true;
            
      }
    
      const testEmail1 = () => {
        if (props.customer.email1) {
          if (isValidEMail(props.customer.email1)) {
            setFormStatus({...formStatus, 
              email1: {
                erro: '',
                validate: 'form-control is-valid'
              }
            });
            return true;
          }
          setFormStatus({...formStatus, 
            email1: {
              erro: 'E-mail inválido!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
      }
    
      const testEmail2 = () => {
        if (props.customer.email2) {
          if (isValidEMail(props.customer.email2)) {
            setFormStatus({...formStatus, 
              email2: {
                erro: '',
                validate: 'form-control is-valid'
              }
            });
            return true;
          }
          setFormStatus({...formStatus, 
            email2: {
              erro: 'E-mail inválido!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
      }
    
      const testSite = () => {

        if (props.customer.site) {
          if (!isSite(props.customer.site)) {
            setFormStatus({...formStatus, 
              site: {
                erro: 'Site inválido!',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
          setFormStatus({...formStatus, 
            site: {
              erro: '',
              validate: 'form-control is-valid'
            }
          });
          return true;
        }
        setFormStatus({...formStatus, 
          site: {
            erro: '',
            validate: 'form-control'
          }
        });
        
      }
    

    return(
        <>
        <div className="row">
            <div className="col-md-4 mb-3">
              <label>Telefone 01<span className='required_field'> * </span></label>
                <span className='is_whats_app'>
                  <input type="checkbox" className='largerCheckbox'name="whats_app_phone1" checked={ props.customer.whats_app_phone1 } onChange={handleChangeChecked} />
                  <img alt="WhatsApp" width="40" height="40" src="https://setydeias.com.br/wp-content/uploads/2021/09/whatsapp-logo.png" />
                </span>
              <input 
                type="text" 
                className={formStatus.phone_number1.validate} 
                name="phone_number1" 
                id='phone_number1'
                onChange={handleChangePhone}
                onBlur={testPhone1}
                value={ setMaskTelefone(props.customer.phone_number1) }
                required
                placeholder='(00) 0.0000-0000'
              />
              <div className="invalid-feedback">
                { formStatus.phone_number1.erro  } 
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Telefone 02</label>
              <span className='is_whats_app'>
                <input type="checkbox" className="largerCheckbox" name="whats_app_phone2" checked={ props.customer.whats_app_phone2 } onChange={handleChangeChecked} />
                <img alt="WhatsApp" width="40" height="40" src="https://setydeias.com.br/wp-content/uploads/2021/09/whatsapp-logo.png" />
              </span>              
              <input 
                type="text" 
                className={formStatus.phone_number2.validate} 
                name="phone_number2" 
                id='phone_number2'
                onChange={handleChangePhone}
                onBlur={testPhone2}
                value={ setMaskTelefone(props.customer.phone_number2) }
                placeholder='(00) 0.0000-0000'
              />
              <div className="invalid-feedback">
                { formStatus.phone_number2.erro  } 
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Telefone 03 </label>
              <span className='is_whats_app'>
                <input type="checkbox" className="largerCheckbox" name="whats_app_phone3" checked={ props.customer.whats_app_phone3 } onChange={handleChangeChecked} />
                <img alt="WhatsApp" width="40" height="40" src="https://setydeias.com.br/wp-content/uploads/2021/09/whatsapp-logo.png" />
              </span>              
              <input 
                type="text" 
                className={formStatus.phone_number3.validate} 
                name="phone_number3" 
                id='phone_number3'
                onChange={handleChangePhone}
                onBlur={testPhone3}
                value={ setMaskTelefone(props.customer.phone_number3) }
                placeholder='(00) 0.0000-0000'
                />
              <div className="invalid-feedback">
                { formStatus.phone_number3.erro  } 
              </div>
            </div>            
          </div>       
          <div className="row">
            <div className="col-md-6 mb-3">
                <label>E-mail preferencial</label>
                <input 
                  type="text" 
                  className={formStatus.email1.validate} 
                  name="email1" 
                  id='email1'
                  value={ props.customer.email1 }
                  onChange={handleChange}
                  onBlur={testEmail1}
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.email1.erro  }
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <label>E-mail alternativo</label>
                <input 
                  type="text" 
                  className={formStatus.email2.validate} 
                  name="email2" 
                  id='email2'
                  value={ props.customer.email2 }
                  onChange={handleChange}
                  onBlur={testEmail2}
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.email2.erro  }
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Site</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">http://</div>
                </div>
                <input 
                  type="text" 
                  className={formStatus.site.validate} 
                  name="site" 
                  id='site'
                  value={ props.customer.site ?  props.customer.site : ''}
                  onChange={handleChange}
                  onBlur={testSite}
                />
                <div className="invalid-feedback">
                    { formStatus.site.erro  }
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
                <label>Facebook</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">http://facebook.com/</div>
                  </div>
                  <input 
                    type="text" 
                    className={formStatus.facebook.validate} 
                    name="facebook" 
                    id='facebook'
                    value={ props.customer.facebook }
                    onChange={handleChange}
                    placeholder=''
                  />
                  <div className="invalid-feedback">
                    { formStatus.facebook.erro  }
                  </div>
                </div>                
            </div>
            <div className="col-md-4 mb-3">
                <label>Instagram</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">http://instagram.com/</div>
                  </div>
                  <input 
                  type="text" 
                  className={formStatus.instagram.validate} 
                  name="instagram" 
                  id='instagram'
                  value={ props.customer.instagram }
                  onChange={handleChange}
                  placeholder=''
                />
                <div className="invalid-feedback">
                  { formStatus.instagram.erro  }
                </div>
                </div>                
            </div>
          </div>
        </>
    )
}

export default PersonContact;