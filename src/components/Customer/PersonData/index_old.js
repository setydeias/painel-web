import React, { useState } from "react";
import InputDocumentType from '../../Form/Input/Document_type/index';
import InputDocument from '../../Form/Input/Document/index';
import { 
    isValibCep, 
    isValidUf, 
    isValidCPF, 
    isValidCNPJ,
    isValidEMail,
    formatDate,
    testValidPhone,
    testAge,
    isSite,
    isValibCnae,
    totalCaracters,
    clearForm
  } from '../../../utilities/Utilities';
import { 
    noMask, 
    maskCep, 
    maskCPF, 
    maskCNPJ,
    maskTelefone,
    setMaskCnae
  } from '../../../utilities/masks';


const PersonData = (props) => {

    const typeDocumentDefault = {
        type: '1',
        description_type: 'CPF',
        date_label: 'Data nascimento',
        description_label: 'Nome'
      }
    
    const [type_document, setTypeDocument] = useState(() => typeDocumentDefault);
    
    
    const handleChangeDocumentType = (e) => {        
      e.preventDefault();

      testFildsDocumentType(e.target.value);   
      props.setCustomer({...props.customer, [e.target.name]: e.target.value });
    };
    
    const handleChangeMaskCPF = (e) => { 
        e.preventDefault();
        
        maskCPF(e);
        props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
      }
    
    const handleChangeMaskCNPJ = (e) => { 
      e.preventDefault();
      
      maskCNPJ(e);
      props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
    }

    const testFildsDocumentType = (type) => {

        if (type === '1') {
          setTypeDocument({
            type: '1',
            description_type: 'CPF',
            date_label: 'Data nascimento',
            description_label: 'Nome'
          })
        }else {
          setTypeDocument({
            type: '2',
            description_type: 'CNPJ',
            date_label: 'Data de abertura',
            description_label: 'Razão Social'
          })
        }
      }

    return(
        <>
        <InputDocumentType 
            references={ props.references }
            handleChangeDocumentType={handleChangeDocumentType}
        />
        <InputDocument 
            references={ props.references }
            type_document={ type_document }
            formStatus={ props.formStatus }
            handleChangeMaskCPF={ handleChangeMaskCPF }
            handleChangeMaskCNPJ={ handleChangeMaskCNPJ }
            customer={ props.customer }
            
        />
        {/*<div className="col-md-3 mb-3">
          <label>{ type_document.date_label }<span className='required_field'> *</span></label>
          <input 
            type="date" 
            className={formStatus.date.validate}
            name="date"
            onChange={handleChange}
            onBlur={testDate}
            required  
            maxLength={10}
            //disabled
          />
          <div className="invalid-feedback">
            {formStatus.date.erro}
          </div>
        </div>    
        <div className="col-md-2 mb-3">
          { 
              type_document.type === '1' ? 
              <>
                <label>Sexo<span className='required_field'> *</span></label>
                <select 
                className={formStatus.sexo.validate}
                name="sexo"
                    onChange={handleChange}
                    onBlur={testSexo}
                    required
                  >
                    <option value='M'>M</option>
                    <option value='F'>F</option>
                    </select>
                <div className="invalid-feedback">
                  { formStatus.sexo.erro }
                </div>
              </>
            : 
              <>
                <label>CNAE<span className='required_field'> *</span></label>
                <input 
                  className={formStatus.cnae.validate}
                  name="cnae"
                  id='cnae'
                  onChange={handleChangeCnae}
                  onBlur={testCnae}
                  required
                  />
                 <div className="invalid-feedback">
                   { formStatus.cnae.erro }
                 </div>
              </>
          }
        </div>*/}
        </>
         
    )

}

export default PersonData;