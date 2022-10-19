import React, { useState, useEffect, useContext } from 'react';
import { setAddress } from '../../../data/address_typr_variations'; 
import { 
    isValibCep, 
    totalCaracters,
  } from '../../../utilities/Utilities';
import { 
  noMask, 
  maskCep, 
  setMaskCep
} from '../../../utilities/masks';
import { getCep } from '../../../api/Correios/Services';
import { CustomerContext } from '../../../Contexts/Customer/CustomerContext';

const PersonAddress = (props) => { 

    const { formStatus, setFormStatus } = useContext(CustomerContext);
    const [cepTest, setCepTest] = useState();

    var references = {
        cep: document.getElementById('cep'),
        city: document.getElementById('city'),
        uf: document.getElementById('uf'),
        address_type: document.getElementById('address_type'),
        address: document.getElementById('address'),
        address_number: document.getElementById('address_number'),   
        total_characters: document.getElementById('total_characters'),
    }
    
    
    const [total_characters_adress, setTotalCaractersAdress] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setCustomer({ ...props.customer, [name]: value });
    };
    
    const handleChangeMaskCep = (e) => { 
        e.preventDefault();
        
        maskCep(e);
        props.setCustomer({ ...props.customer, [e.target.name]: e.target.value });
    }

    const handleChangeMaskUf = (e) => { 
        e.preventDefault();
    
        props.setCustomer({ ...props.customer, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        setTotalCaractersAdress(
          parseInt(props.customer.address_type.length) + 
          parseInt(props.customer.address.length) +
          parseInt(props.customer.address_number.length) +
          parseInt(props.customer.address_complement.length) + 
          parseInt(props.customer.district.length)
        ) 
    
      }, [
        props.customer.address_type, 
        props.customer.address, 
        props.customer.address_number, 
        props.customer.address_complement,
        props.customer.district
    ])


    useEffect(() => {
      if (total_characters_adress > 0) {
        testAddressCaracters();
      }
    }, [total_characters_adress])

    
    const searchCep = async (e) => { 

        if(testCep()) {    
          
          const resp = await getCep(noMask(e.target.value)); 
          if(resp.status === 200 && !resp.data.erro) {

            const logradouro_split = resp.data.logradouro.split(' ', 1);  

            props.setCustomer((prevState) => ({ ...prevState,
              ...{ 
                  city: resp.data.localidade, 
                  uf: resp.data.uf,
                  district: resp.data.bairro,
                  address: setAddress(resp.data.logradouro),
                  address_type: logradouro_split[0]
                 }
            }));         
            references.city.focus();
            validCep(resp);
          }
          
          if (resp.data.erro) {
            setFormStatus({...formStatus, 
              cep: {
                erro: 'Não encontrado!',
                validate: 'form-control is-invalid'
              }
            })
          }        
        }
    }

    const validCep = (resp) => {

      setFormStatus({...formStatus, 
        cep: {
          erro: '',
          validate: 'form-control is-valid',
        },
        city: {
          erro: '',
          validate: 'form-control is-valid',
        },
        uf: {
          erro: '',
          validate: 'form-control is-valid',
        },
        address_type: {
          erro: '',
          validate: 'form-control is-valid',
        },
        address: {
          erro: '',
          validate: 'form-control is-valid',
          complement: 'Complemento: { ' + resp.data.complemento + ' }',
          feedback: 'valid-feedback'
        },
        district: {
          erro: '',
          validate: 'form-control is-valid',
        }        
      });    

      var address_number_interval = setInterval(function() {
        references.address_number.focus();
        clearInterval(address_number_interval);
      }, 100);
    }

    const testCep = () => {

      if (props.customer.cep) {   

        if (!isValibCep(props.customer.cep)) {
          setFormStatus({...formStatus, 
            cep: {
              erro: 'CEP inválido!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          cep: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });      
        return true;
      } else {
        setFormStatus({...formStatus, 
          cep: {
            erro: 'Campo obrigatório!',
            validate: 'form-control is-invalid'
          }
        });
        return false;
      } 
    }

    const testAddressCaracters = () => {
            
        if (!totalCaracters(
          props.customer.address_type.trim() +
          props.customer.address.trim() +
          props.customer.address_number.trim() +
          props.customer.address_complement.trim() +
          props.customer.district.trim(), 
          56      
        )) {
          setFormStatus({...formStatus, 
            address_caracters: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_type: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_number: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            address_complement: {
              erro: '',
              validate: 'form-control is-invalid'
            },
            district: {
              erro: '',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_caracters: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_type: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address: {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_number  : {
            erro: '',
            validate: 'form-control is-valid'
          },
          address_complement: {
            erro: '',
            validate: 'form-control is-valid'
          },
          district: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
    }

    const testCity = () => {      

      if (props.customer.city) {
        setFormStatus({...formStatus, 
          city: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
      setFormStatus({...formStatus, 
        city: {
          erro: 'Campo obrigatório!',
          validate: 'form-control is-invalid'
        }
      });
      return false;
    }
    
      const testUf = () => {
        if (!props.customer.uf) {
          setFormStatus({...formStatus, 
            uf: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          uf: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testDistrict = () => {
        if (!props.customer.district) {
          setFormStatus({...formStatus, 
            district: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          district: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testTypeAddress = () => {
        if (!props.customer.address_type) {
          setFormStatus({...formStatus, 
            address_type: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_type: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testAddress = () => {
        
        if (!props.customer.address) {
          setFormStatus({...formStatus, 
            address: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
    
        references.address.value = setAddress(references.address.value);
        props.setCustomer({ ...props.customer, address: references.address.value });
       
        setFormStatus({...formStatus, 
          address: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    
      const testNumberAddress = () => {
        if (!props.customer.address_number) {
          setFormStatus({...formStatus, 
            address_number: {
              erro: 'Campo obrigatório!',
              validate: 'form-control is-invalid'
            }
          });
          return false;
        }
        setFormStatus({...formStatus, 
          address_number: {
            erro: '',
            validate: 'form-control is-valid'
          }
        });
        return true;
      }
    

    return(
        <>
            <div className="row">
            <div className="col-md-2 mb-3">
              <label>CEP<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.cep.validate} 
                id="cep"
                name="cep" 
                value={ setMaskCep(props.customer.cep) }
                onChange={handleChangeMaskCep}
                onBlur={searchCep}
                required  
                placeholder='CEP'
              />
              <div className="invalid-feedback">
                { formStatus.cep.erro } 
              </div>
            </div> 
            <div className="col-md-6 mb-3">
              <label>Cidade<span className='required_field'> *</span></label>
              <input 
                type="text" 
                className={formStatus.city.validate} 
                name="city" 
                id='city'   
                value={ props.customer.city  }            
                onChange={handleChange}
                onBlur={testCity}
                required  
                placeholder='Cidade'
              />
              <div className="invalid-feedback">
                { formStatus.city.erro  } 
              </div>
            </div>  
            <div className="col-md-2 mb-3">
              <label>UF<span className='required_field'> *</span></label>
              <select 
                type="text" 
                className={formStatus.uf.validate}  
                name="uf" 
                id='uf'
                value={ props.customer.uf }
                onChange={handleChangeMaskUf} 
                onBlur={testUf}
                required  
                placeholder='UF'
                maxLength={2}
              >
                <option value=''></option>
                <option value='AC'>AC</option>
                <option value='AL'>AL</option>
                <option value='AP'>AP</option>
                <option value='AM'>AM</option>
                <option value='BA'>BA</option>
                <option value='CE'>CE</option>
                <option value='DF'>DF</option>
                <option value='ES'>ES</option>
                <option value='GO'>GO</option>
                <option value='MA'>MA</option>
                <option value='MT'>MT</option>
                <option value='MS'>MS</option>
                <option value='MG'>MG</option>
                <option value='PA'>PA</option>
                <option value='PB'>PB</option>
                <option value='BR'>PR</option>
                <option value='PE'>PE</option>
                <option value='PI'>PI</option>
                <option value='RJ'>RJ</option>
                <option value='RN'>RN</option>
                <option value='RS'>RS</option>
                <option value='RO'>RO</option>
                <option value='RR'>RR</option>
                <option value='SC'>SC</option>
                <option value='SP'>SP</option>
                <option value='SE'>SE</option>
                <option value='TO'>TO</option>
              </select>
              <div className="invalid-feedback">
                { formStatus.uf.erro  }
              </div>
            </div>  
            <div className="col-md-2 mb-3">
              <label>Total Caracteres</label>
              <input 
                type="text" 
                className={formStatus.address_caracters.validate} 
                name="total_characters" 
                id='total_characters'
                value={
                  total_characters_adress + '/56'                  
                }
                disabled
              />
            </div>                                        
          </div>
          <div className='row'>
          <div className="col-md-2 mb-3">
              <label>
                  Tipo
                  <span className='required_field'> * </span>
                  <span className='total_characters_label'></span>
                  <span className='total_characters_label'>
                    {props.customer.address_type.length > 0 ? props.customer.address_type.length : ''}
                  </span>
              </label>
              <select 
                type="text" 
                className={formStatus.address_type.validate} 
                name="address_type" 
                id='address_type'
                value={ props.customer.address_type }
                onChange={handleChange}
                onBlur={testTypeAddress}
                required  
              >
                 <optgroup label="Tipos de Logradouro">
                    <option value=""></option>
                    <option value="Aeroporto"> Aeroporto </option>
                    <option value="Alameda"> Alameda </option>
                    <option value="Área"> Área </option>
                    <option value="Avenida"> Avenida </option>
                    <option value="Bêco"> Bêco </option>
                    <option value="Chácara"> Chácara </option>
                    <option value="Colônia"> Colônia </option>
                    <option value="Condomínio"> Condomínio </option>
                    <option value="Conjunto"> Conjunto </option>
                    <option value="Distrito"> Distrito </option>
                    <option value="Esplanada"> Esplanada </option>
                    <option value="Estação"> Estação </option>
                    <option value="Estrada"> Estrada </option>
                    <option value="Favela"> Favela </option>
                    <option value="Fazenda"> Fazenda </option>
                    <option value="Feira"> Feira </option>
                    <option value="Jardim"> Jardim </option>
                    <option value="Ladeira"> Ladeira </option>
                    <option value="Lago"> Lago </option>
                    <option value="Lagoa"> Lagoa </option>
                    <option value="Largo"> Largo </option>
                    <option value="Loteamento"> Loteamento </option>
                    <option value="Morro"> Morro </option>
                    <option value="Núcleo"> Núcleo </option>
                    <option value="Parque"> Parque </option>
                    <option value="Passarela"> Passarela </option>
                    <option value="Pátio"> Pátio </option>
                    <option value="Praça"> Praça </option>
                    <option value="Quadra"> Quadra </option>
                    <option value="Recanto"> Recanto </option>
                    <option value="Residencial"> Residencial </option>
                    <option value="Rodovia"> Rodovia </option>
                    <option value="Rua"> Rua </option>
                    <option value="Setor"> Setor </option>
                    <option value="Sítio"> Sítio </option>
                    <option value="Travessa"> Travessa </option>
                    <option value="Trecho"> Trecho </option>
                    <option value="Trevo"> Trevo </option>
                    <option value="Via"> Via </option>
                    <option value="Viaduto"> Viaduto </option>
                    <option value="Viela"> Viela </option>
                    <option value="Vila"> Vila </option>                                         
                  </optgroup>
              </select>

              <div className="invalid-feedback">
                { formStatus.address_type.erro  } 
              </div>
            </div>    
          <div className="col-md-8 mb-3">
              <label>Logradouro
                  <span className='required_field'> * </span>
                  <span className='total_characters_label'> 
                    { props.customer.address.length > 0 ?  props.customer.address.length : ''}
                  </span> 
              </label>{formStatus.address.complement ? <a href='https://buscacepinter.correios.com.br/app/localidade_logradouro/index.php'  target="blank">: Buscar CEP</a> : ''}
              <input 
                type="text" 
                className={formStatus.address.validate}
                name="address"
                id='address'
                value={ props.customer.address }
                onChange={handleChange}
                onBlur={testAddress}
                required  
                placeholder='Endereço'
              />
              <div className={formStatus.address.complement ? 'valid-feedback' : 'invalid-feedback'}>
                { formStatus.address.complement ? formStatus.address.complement : formStatus.address.erro }
              </div>
            </div>
            <div className="col-md-2 mb-3">
              <label>
                Nº<span className='required_field'> * </span>
                <span className='total_characters_label'>
                  {props.customer.address_number.length > 0 ?  props.customer.address_number.length : ''}
                </span>
              </label>
              <input 
                type="text" 
                className={formStatus.address_number.validate} 
                name="address_number" 
                id='address_number'
                value={ props.customer.address_number }
                onChange={handleChange}
                onBlur={testNumberAddress}
                required  
                placeholder='Nº/Apto/Casa'/>
              <div className="invalid-feedback">
                { formStatus.address_number.erro  } 
              </div>
            </div>               
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Complemento</label> 
              <span className='total_characters_label'>  
                { props.customer.address_complement.length > 0 ? ' ' + props.customer.address_complement.length : ''} 
              </span>
              <input  
                className= { formStatus.address_complement.validate } 
                name="address_complement"
                id="address_complement" 
                value={ props.customer.address_complement }
                onChange={handleChange}
                placeholder='Bloco, Apto, Condomínio, Ponto de referência ...'
              />
              <div className="invalid-feedback">
                { formStatus.address_complement.erro }
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>
                Bairro 
                <span className='required_field'> * </span>
                <span className='total_characters_label'>  
                  { props.customer.district.length > 0 ? props.customer.district.length : ''} 
                </span>
              </label>
              <input 
                type="text" 
                className={formStatus.district.validate} 
                name="district" 
                id='district'
                value={ props.customer.district }
                onChange={handleChange}
                onBlur={testDistrict}
                required  
                placeholder='Bairro'/>
              <div className="invalid-feedback">
                { formStatus.district.erro  } 
              </div>
            </div>      
          </div>  
        </>
    )
}

export default PersonAddress;