import React, { useContext, useState } from 'react';
import './style.css';
import { clearForm, formatDate } from '../../../utilities/Utilities';
import PersonData from '../PersonData';
import PersonAddress from '../PersonAddress';
import PersonContact from '../PersonContact';
import PersonNotes from '../PersonNotes';
import { useEffect } from 'react';
import ModalContirm from '../../Modal/Confirm';
import { 
  getCustomerForDocument,
  registerCustomer,
  updateCustomer 
} from '../../../api/Clients/Clientes';
import ModalAlert from '../../Modal/Alert';
import { CustomerContext } from '../../../Contexts/Customer/CustomerContext';


const RegisterCostumer = (props) => { 
    
  const [isSubmit, setIsSubmit] = useState(false);
  const [spinner, setSpinner] = useState(() => false);

  const { setFormStatus, statusFormDefault } = useContext(CustomerContext);


    const customerDefault = {
        id: '',
        name_application_bb: null,
        id_application_bb: null,
        developer_application_key: null,
        client_id: null,
        client_secret: null,
        basic_copy: null,
        document_type: 1,
        document: '',
        cnae: null,
        description: '',
        fantasy_name: null,
        usual_name: '',
        date: null,
        sexo: '1',
        treatment: null,
        date_registration: '',
        date_update: null,
        address_type: '',
        address: '',
        address_number: '',
        city: '',
        uf: '',
        address_complement: '',
        district: '',
        cep: '',
        phone_number1: '',
        whats_app_phone1: false,
        phone_number2: '',
        whats_app_phone2: false,
        phone_number3: '',
        whats_app_phone3: false,
        email1 : null,
        email2: null,
        site: null,
        facebook: null,
        instagram: null,
        notes: '', 
        access_key: null
    }

    const [clientForDocumentExists, setclientForDocumentExists] = useState(customerDefault);

    const modalDefault = { 
        modal: false, 
        titulo: '', 
        texto: '', 
        acao1: '', 
        acao2: '' 
    }

    const [customer, setCustomer] = useState(customerDefault);

    const [modal, setModal] = useState(modalDefault);
    const toggle = () => setModal(!modal);

    const [modalAlert, setModalAlert] = useState( { 
      modal: false, 
      title: '', 
      text: '', 
    });
    const toggleAlert = () => setModalAlert(!modalAlert);

    useEffect(() => {

       if (props.action ==='change') {
           setCustomer(props.customer);
           setDateUpdate();
       }

    },[])

    const setDateUpdate = () => {

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);  
      setCustomer((prevent) => ({ ...prevent, date_update: formatDate(today, 'aaaa-mm-dd')})); 
    }

    const handleSubmit = (e) => {
          
      e.preventDefault();
      setIsSubmit(true);
      setSpinner(()=> true);

      if(props.action === 'change') {
        update();        
        return;        
      }
      register();      
    }
  
    const register = async () => { 
      
      try {

        const response = await registerCustomer(customer);
        if (response.status === 201) {
          setCustomer(customerDefault);
          setModal({
              ...modal,
              modal: true,
              titulo: 'Informação',
              texto: response.data.message,
              acao1: 'OK'
          })
          setFormStatus(statusFormDefault);
          clearForm();
        }
        return ; 
        
      } catch (error) {
        setModal({
          ...modal,
          modal: true,
          titulo: 'Atenção!',
          texto: error.response.data.message,
          acao1: 'OK'
        })
      }
      setSpinner(() => false);   
    }

    const update = async () => {

      try {
        const response = await updateCustomer(customer);
        if (response.status === 202) {
          
          if(props.customer === undefined) {
            
            setModal({
              ...modal,
              modal: true,
              titulo: 'Informação',
              texto: response.data.message,
              acao1: 'OK'
            })

            setTimeout(() => {
              
              this.props.history.push('/');
            }, 3000);

            
          }          
          
          props.setCustomerUpdate(customer)
          setCustomer(customerDefault);  
          
          setModal({
              ...modal,
              modal: true,
              titulo: 'Informação',
              texto: response.data.message,
              acao2: 'OK'
          })
          setFormStatus(statusFormDefault); 
        }

        return;
        
      } catch (error) {
        setModal({
          ...modal,
          modal: true,
          titulo: 'Atenção!',
          texto: error.response.data.message,
          acao1: 'OK'
        })
      }
      setSpinner(() => false);
    }
  
    const btnClear = () => { 

      clearForm();
      setFormStatus(()=>statusFormDefault);
      setCustomer(customerDefault);
    }

    const testDcumentExists =  async () => { 
      try {

        let resp = await getCustomerForDocument(customer.document);
          
          if (resp.status === 200) {      
            
            setclientForDocumentExists(...resp.data.clients)
            setModalAlert({ 
              modal: true, 
              title: 'Atenção!', 
              text: 'Ducumento já cadastro. Deseja visualizar?', 
            })
          }

      } catch (error) {

        if(!error.response.data.message === 'Documento informado não cadastrdo.') {
          setModal({
            ...modal,
            modal: true,
            titulo: 'Atenção!',
            texto: error.response.data.message,
            acao1: 'OK',
          })
        }
      }
    }

    const showDatailsForDocument = () => {

      props.setAction('change');
      setCustomer({...clientForDocumentExists});
      props.setTestDocumentExist(clientForDocumentExists.document);
      setCustomer((prevent) => ({ ...prevent, date: clientForDocumentExists.date.substring(0, 10) }) )
      
      setModalAlert({
        ...modalAlert, 
        modal: false, 
      })
    }
  

    /*const validate = () => {    

      if (
            testCity() &&
            testUf()  &&
            testDistrict() &&
            testTypeAddress() &&
            testAddress() &&
            testNumberAddress()
            testAddressCaracters()
          )
      {
        return true;
      }
      return false;
    }*/

  return(
    <div className='container-sm'>
      { props.action === 'change' ? '' : <h4 className='title-page'>Cadastrar Cliente</h4> } 
      <form className='row' onSubmit={handleSubmit}>  
          <PersonData 
            customer={ customer  }
            setCustomer={ setCustomer }
            testDcumentExists={ testDcumentExists }
            action={ props.action }
            document={ props.document}
            />
          <PersonAddress 
            customer={  customer  }
            setCustomer={ setCustomer }
            action={ props.action }
          />
          <PersonContact 
            customer={  customer  }
            setCustomer={ setCustomer }
          />
          <PersonNotes 
            customer={  customer  }
            setCustomer={ setCustomer }
          />    
          <div className="row" >            
            <div className="d-grid gap-2">
              <button 
                className="btn btn-margin" 
                style={{'background': '#008080', 'color': '#fff'}}
                type="submit"
                >
                  { props.spinner === true ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{marginRight: '5px'}}> </span> : ''} 
                  { props.action === 'change' ? 'Alterar' : 'Cadastrar' }
              </button>
            </div>
            <div className="d-grid gap-2">
              <button 
                className="btn btn-margin" 
                style={{'background': '#008080', 'color': '#fff'}}
                type="button"
                onClick={ btnClear }
                >
                Limpar formulário
              </button>
            </div>     
          </div>
      </form>
      <ModalContirm 
        modal={modal} 
        toggle={toggle} 
      />
      <ModalAlert 
        modal={modalAlert} 
        toggle={toggleAlert}
        action={ showDatailsForDocument }
      /> 
    </div>
  )
}

export default RegisterCostumer;