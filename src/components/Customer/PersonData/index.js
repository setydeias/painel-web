import React, { useState, useEffect, useContext }from 'react';
import { 
    formatDate,
    testAge,
    isValibCnae,
    isValidCPF,
    isValidCNPJ

} from '../../../utilities/Utilities';
import { 
    noMask,
    maskCPF, 
    maskCNPJ,
    maskCnae,
    setMaskCnae,
    setMaskCPF,
    setMaskCNPJ
} from '../../../utilities/masks';
import {getTreatmentMasculine, getTreatmentFemale  } from '../../../data/treatment';
import { getRegionCpf } from '../../../data/cpf_fiscal_region';
import { CustomerContext } from '../../../Contexts/Customer/CustomerContext';

const PersonData = (props) => { 
    
  const { formStatus, setFormStatus } = useContext(CustomerContext);
    
    var references = {
        document_type: document.getElementById('document_type'),   
        cnae: document.getElementById('cnae'),   
        description: document.getElementById('description'),  
    }

    const masculine_list = getTreatmentMasculine();
    const female_list = getTreatmentFemale();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setCustomer({ ...props.customer, [name]: value });
    };

    const handleChangeDocumentType = (e) => {        
        e.preventDefault();
        props.setCustomer({...props.customer, [e.target.name]: parseInt(e.target.value) });
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

    const handleChangeCnae = (e) => {    
    
        e.preventDefault();
        maskCnae(e);
        props.setCustomer({ ...props.customer, [e.target.name]: noMask(e.target.value) });
    };

    useEffect(() => {

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);    
        props.customer.date_registration = formatDate(today, 'aaaa-mm-dd');
               
    }, []);

   
    const testDate = () => {

        if (!props.customer.date) {
          setFormStatus({...formStatus, 
            date: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
     
        if (props.customer.document_type === 1) {
          
          if (!testAge(1, props.customer.date)) {
            setFormStatus({...formStatus, 
              date: {
                erro: 'Não é permitido o cadastro de menores de idade.',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
    
          if (testAge(2, props.customer.date)) {
            setFormStatus({...formStatus, 
              date: {
                erro: 'Idade inválida. Maior de 120 anos.',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
        }      
        
        setFormStatus({...formStatus, 
          date: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testDocument = () => {

      if (testDocumentIsValid()) {
        
        if(props.action === 'change') {
          if(props.customer.document === props.document) {            
            return;
          }else{
            props.testDcumentExists();
            return;
          }
        }
        props.testDcumentExists();        
      }
    }

    const testDocumentIsValid = () => {
      
      if(props.customer.document) {
        if (props.customer.document_type === 1) {
  
          if (!isValidCPF(noMask(props.customer.document))) {
            setFormStatus({...formStatus, 
              document: {
                erro: 'CPF inválido!',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
        } else {
          if (!isValidCNPJ(noMask(props.customer.document))) {
            setFormStatus({...formStatus, 
              document: {
                erro: 'CNPJ inválido!',
                validate: 'form-control is-invalid'
              }
            });      
            return false;
          }
        }    
        setFormStatus({...formStatus, 
          document: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }    
      setFormStatus({...formStatus, 
        document: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }


    const testDocumentType = () => {
        if (!props.customer.document_type) {
          setFormStatus({...formStatus, 
            document_type: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          document_type: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testSexo = () => {
        if (!props.customer.sexo) {
          setFormStatus({...formStatus, 
            sexo: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          sexo: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }
    
    const testCnae = () => {

        if(props.customer.document_type === 2){
          if(props.customer.cnae) {
            if(!isValibCnae(references.cnae.value)){
              setFormStatus({...formStatus, 
                cnae: {
                  erro: 'CNAE inválido!',
                  validate: 'form-control is-invalid'
                }
              });
              return false; 
            }
            setFormStatus({...formStatus, 
              cnae: {
                erro: '',
                validate: 'form-control is-valid'
              }
            });
            return true;
          }
          setFormStatus({...formStatus, 
            cnae: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
    
        return true;
                
    }

    const testTreatment = () => {
        if (!props.customer.treatment) {
          setFormStatus({...formStatus, 
            treatment: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          treatment: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testUsualName = () => {
      if (!props.customer.usual_name) {
        setFormStatus({...formStatus, 
          usual_name: {
            erro: 'Campo obrigatório!',
            validate: 'form-control is-invalid'
          }
        });
        return false;
      }
      setFormStatus({...formStatus, 
        usual_name: {
          erro: '',
          validate: 'form-control is-valid'
        }
      });
      return true;
  }


    const testDescription = () => {    
    
        if (!props.customer.description) {      
          setFormStatus({...formStatus, 
            description: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
    
        if(parseInt(references.description.value.length) < 3) {
    
          setFormStatus({...formStatus, 
            description: {
              erro: 'O Mínimo permitido: Três caracteres.',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }   
    
        setFormStatus({...formStatus, 
          description: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testFantasyName = () => {

        if(props.customer.document_type === 2) {
    
          if (!props.customer.fantasy_name) {
            setFormStatus({...formStatus, 
              fantasy_name: {
                erro: 'Campo obrigatório!',
                validate: 'form-control is-invalid'
              }
            });
            return false;
          }
          setFormStatus({...formStatus, 
            fantasy_name: {
              erro: '',
              validate: 'form-control is-valid'
            }
          });
          return true;
        }
        return getTreatmentMasculine;    
      }

    return(
       <>
       { 
          props.customer.document_type === 1 ?
        <>    
         <div className='row'>          
             <div className="col-md-4">
               <label>Tipo Documento<span className='required_field'> *</span></label>
               <select 
                 className={formStatus.document_type.validate}
                 name="document_type"
                 id="document_type"
                 value={ parseInt(props.customer.document_type) }
                 onChange={handleChangeDocumentType}
                 onBlur={testDocumentType}
                 required
               >
                   <option value={1}>Física</option>
                   <option value={2} >Jurídica</option>
               </select>
               <div className="invalid-feedback">
                 { formStatus.document_type.erro }
               </div>
             </div>
             <div className="col-md-3">
               <label>CPF<span className='required_field'> *</span></label>
               <input 
                 type="text" 
                 className={formStatus.document.validate} 
                 name="document" 
                 id="document"
                 onChange={handleChangeMaskCPF }
                 value={ setMaskCPF(props.customer.document) }
                 onBlur={testDocument}                
                 required 
               />
              { formStatus.document.validate === 'form-control is-valid' ? <span style={{'color' : 'darkgray'}}>{getRegionCpf(noMask(props.customer.document))}</span> : ''}
               <div className="invalid-feedback">
                 { formStatus.document.erro } 
               </div>
             </div>
             <div className="col-md-3 mb-3">
               <label>Data nascimento<span className='required_field'> *</span></label>
               <input 
                 type="date" 
                 className={ formStatus.date.validate }
                 name="date"
                 value={ props.customer.date }
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
               <label>Sexo<span className='required_field'> *</span></label>
               <select 
                 className={formStatus.sexo.validate}
                   name="sexo"
                   value={ parseInt(props.customer.sexo) }
                   onChange={handleChange}
                   onBlur={testSexo}
                   required
                 >
                   <option value={1}>M</option>
                   <option value={2}>F</option>
               </select>
               <div className="invalid-feedback">
                 { formStatus.sexo.erro }
               </div>                  
             </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Tratamento<span className='required_field'> *</span></label>
            <select 
              className={ formStatus.treatment.validate }
              name="treatment"
              value={ props.customer.treatment }
              onChange={handleChange}
              onBlur={testTreatment}
              required
              >
              { 
                props.customer.sexo === '2' ?
                female_list.map((treatment_f, index) => 
                <option key={index = index+1} value={ treatment_f }>
                      { treatment_f }
                    </option>)
                : masculine_list.map((treatment_m, index) => 
                <option key={index = index+1} value={ treatment_m }>
                      { treatment_m }
                    </option>)             
              }
            </select>
            <div className="invalid-feedback">
              { formStatus.treatment.erro }
            </div>
          </div>  
          <div className="col-md-3 mb-3">
             <label >Nome usual
                <span className='required_field'> *</span> 
                <span className='total_characters_label'>
                  { ` ${props.customer.usual_name.length} /20`}
                </span>
             </label>
             <input 
               type="text" 
               className={formStatus.usual_name.validate} 
               name="usual_name" 
               id='usual_name'
               value={ props.customer.usual_name }
               onChange={handleChange} 
               onBlur={testUsualName}
               maxLength={20}
               required
             />
             <div className="invalid-feedback">
                { formStatus.usual_name.erro }
             </div>
           </div> 
           <div className="col-md-6 mb-3">
             <label > Nome
                 <span className='required_field'> *</span> 
                 <span className='total_characters_label'>
                   { ` ${props.customer.description.length} /60` }
                 </span>
             </label>
             <input 
               type="text" 
               className={formStatus.description.validate} 
               name="description" 
               id='description'
               value={ props.customer.description }
               onChange={handleChange}
               onBlur={testDescription}
               required  
               placeholder='Nome do Cliente'
               maxLength={60}
             />
             <div className="invalid-feedback">
                 { formStatus.description.erro }
             </div>
            </div>      
         </div>
        </>
        :
        <>
        <div className='row'>          
             <div className="col-md-4 mb-3">
               <label>Tipo Documento<span className='required_field'> *</span></label>
               <select 
                 className={formStatus.document_type.validate}
                 name="document_type"
                 id="document_type"
                 value={ parseInt(props.customer.document_type) }
                 onChange={handleChangeDocumentType}
                 onBlur={testDocumentType}
                 required
               >
                   <option value={1}>Física</option>
                   <option value={2} >Jurídica</option>
               </select>
               <div className="invalid-feedback">
                 { formStatus.document_type.erro }
               </div>
             </div>
             <div className="col-md-3 mb-3">
               <label>CNPJ<span className='required_field'> *</span></label>
               <input 
                 type="text" 
                 className={formStatus.document.validate} 
                 name="document" 
                 id="document"
                 onChange={ handleChangeMaskCNPJ }
                 value={ setMaskCNPJ(props.customer.document) }
                 onBlur={testDocument}                
                 required 
               />
               <div className="invalid-feedback">
                 { formStatus.document.erro } 
               </div>
             </div>
             <div className="col-md-3 mb-3">
               <label>Data de abertura<span className='required_field'> *</span></label>
               <input 
                 type="date" 
                 className={ formStatus.date.validate }
                 name="date"
                 value={ props.customer.date }
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
                <label>CNAE Principal<span className='required_field'> *</span></label>
                <input 
                  className={formStatus.cnae.validate}
                  name="cnae"
                  id='cnae'
                  value={ setMaskCnae(props.customer.cnae) }
                  onChange={handleChangeCnae}
                  onBlur={testCnae}
                  maxLength={10}
                  required
                />
                <div className="invalid-feedback">
                  { formStatus.cnae.erro }
                </div>
             </div>
        </div>
        <div className="row">				  
          <div className="col-md-5 mb-3">
            <label>Nome Fantasia<span className='required_field'> *</span></label>
            <input 
              className={formStatus.fantasy_name.validate}
              name="fantasy_name"
              id='fantasy_name'
              value={ props.customer.fantasy_name }
              onChange={handleChange}
              onBlur={testFantasyName}
              maxLength={20}
              required
            />
              <div className="invalid-feedback">
              { formStatus.fantasy_name.erro }
              </div>
          </div>
          <div className="col-md-7 mb-3">
            <label >Razão Social
              <span className='required_field'> *</span>
              <span className='total_characters_label'>
                { props.customer.description ? ` ${props.customer.description.length} /60` : ''}
              </span>
            </label>
            <input 
              type="text" 
              className={formStatus.description.validate} 
              name="description"
              id="description" 
              value={ props.customer.description}
              onChange={handleChange}
              onBlur={testDescription}
              required  
              placeholder='Nome do Cliente'
              maxLength={60}
            />
            <div className="invalid-feedback">
              { formStatus.description.erro }
            </div>
          </div>        
        </div>
        </>
        }
       </>
    )
}

export default PersonData;