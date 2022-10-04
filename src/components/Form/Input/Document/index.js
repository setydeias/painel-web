import React, { useState } from "react";
import { isValidCPF, isValidCNPJ } from '../../../../utilities/Utilities';
import { noMask } from '../../../../utilities/masks';


const Document = (props) => {

  const statusFormDefault = {
    erro: '',
    validate: 'form-control'
  } 

  const [formStatus, setFormStatus] = useState(()=>statusFormDefault);

  const testDocument = () => {

    
    if(props.customer.document) {
      
      if (props.type_document.type === '1') {
        if (!isValidCPF(noMask(props.customer.document))) {
          setFormStatus({...formStatus, 
            erro: 'CPF inválido!',
            validate: 'form-control is-invalid'
          });
          return ;
        }
      } else {
        if (!isValidCNPJ(noMask(props.customer.document))) {
          setFormStatus({...formStatus, 
              erro: 'CNPJ inválido!',
              validate: 'form-control is-invalid'
          });
          return ;
        }
      }    
      setFormStatus({...formStatus, 
          erro: '',
          validate: 'form-control is-valid'
      });
      return;
    }    
    setFormStatus({...formStatus, 
        erro: 'Campo obrigatório!',
        validate: 'form-control is-invalid'
    });
  }
  

  return(
      <div className="col-md-3 mb-3">
      <label>{props.type_document.description_type}<span className='required_field'> *</span></label>
      <input 
        type="text" 
        className={ formStatus.validate  } 
        name="document" 
        id="document"
        onChange={props.type_document.description_type === 'CPF' ? props.handleChangeMaskCPF :  props.handleChangeMaskCNPJ }
        onBlur={ testDocument }
        required 
      />
      <div className="invalid-feedback">
        { formStatus.erro } 
      </div>
    </div>
  )
}

export default Document;