import React, { useState } from 'react';
import {
  isValidCPF,
  isValidCNPJ,
  isValidEMail
} from '../../utilities/Utilities';

import { 
  noMask,
  maskCPF,
  maskCNPJ,
  maskTelefone,
  setMaskCPF,
  setMaskCNPJ,
  setMaskTelefone, 
} from '../../utilities/masks';

import './style.css';

import { 
  getCustomer, 
  getCustomerForDocument, 
  getCustomerForDescription,
  getCustomerForUsualName,
  getCustomerForFantasyName,
  getCustomerForPhoneNumber1,
  getCustomerForEmail1,
  deleteCustomer, 
  getCustomers
} from '../../api/Clients/Clientes';

import ModalAction from '../../components/Modal/Actions';
import CustomerChange from '../../components/Modal/Customer/change/index';
import Feedback from '../../components/Form/Input/Feedback';
import MySelect from '../../components/Form/Input/Select';
import { Link } from 'react-router-dom';
import { CustomerContextProvider } from '../../Contexts/Customer/CustomerContext';

const Customer = () => { 
  
  const [textOption, setTextOption] = useState(false);
  const [testDocumentExist, setTestDocumentExist] = useState('');

  const [list, setList] = useState([]);
  const [customer_changer, setCustomerChanger] = useState({});
  
  const feedBackDefault = {
    visible: '.d-block',
    type: '',
    title: '',
    message: ''
  }

  const [feedBack, setFeedBack] = useState(feedBackDefault);

  const modalDefault = { 
    modal: false, 
    titulo: '', 
    texto: '', 
    acao1: '', 
    acao2: '' 
  } 
  
  const [selectFilter, setSelectFilter] = useState({
    id: 'selectFilterClient',
    name: 'selectedType',
    label_text: 'Consultar por:',
    class: 'form-control',
    list: [],
    selectedType: 'Código'
  });

  const [dataFilter, setDataFilter] = useState();

  const [modal, setModal] = useState(modalDefault);
  const toggle = () => setModal(!modal);

  const [modalAction, setModalAction] = useState({ modalAction : false });
  const toggleAction = () => setModalAction(!modalAction);
 
  const [action, setAction] = useState('change');

  const handleChangeFilterType = (e) => { 

    const { name, value } = e.target;
    setSelectFilter({ ...selectFilter, [name]: value });
    //references.document = '';
    //references.document.focus();
  }

  const handleSelect = (client) => {
    
    setCustomerChanger(client);
    setTestDocumentExist(client.document);
    setCustomerChanger((prevent) => ({ ...prevent, date: client.date.substring(0, 10) }) );

    setModalAction({
      modal: true,
    })    
  }

  const handleChangeFilter = (e) => {

    e.preventDefault();
    const { value } = e.target;     
   
    if(selectFilter.selectedType === 'CPF') maskCPF(e);
    if(selectFilter.selectedType === 'CNPJ') maskCNPJ(e);
    if(selectFilter.selectedType === 'Telefone') maskTelefone(e);
    
    setDataFilter(noMask(value));
  }
  

  const filterCustomer = (e) => {
    
    e.preventDefault();

    if (testDataFilter()) { 
      
      switch (selectFilter.selectedType) {
        case 'Código':  
          filterCustomerForId();
          break;
        case 'CPF':
          filterCustomerForDcument();
          break;
        case 'CNPJ':
          filterCustomerForDcument();
          break;
        case 'Nome':
          filterCustomerForDescription();
          break;
          case 'Nome usual':
            filterCustomerForUsualName();
            break;
          case 'Razão Social':
            filterCustomerForDescription();
            break;
          case 'Nome Fantasia':
            filterCustomerForFantasyName();
            break;
          case 'Telefone':
            filterCustomerForPhoneNumber1();
            break;
            case 'E-mail':
              filterCustomerForEmial1();
              break;
            case 'Todos':
              filterCustomerAll();
              break;
        default:
          break;
      }
    }

  }

  const filterCustomerAll = async () => {
  
    try {
      setList([]);
      const resp = await getCustomers();
      if (resp.status === 200) {
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }

    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();        
    }
  }

  const filterCustomerForId = async () => { 
    
    try {
      setList([]);
      let resp = await getCustomer(dataFilter);         
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const filterCustomerForDcument =  async () => { 
    
    try {
      setList([]);
      let resp = await getCustomerForDocument(noMask(dataFilter));
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const filterCustomerForDescription =  async () => { 

    try {
      setList([]);
      let resp = await getCustomerForDescription(dataFilter);
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const filterCustomerForFantasyName=  async () => { 

    try {
      setList([]);
      let resp = await getCustomerForFantasyName(dataFilter);
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }


  const filterCustomerForUsualName =  async () => { 

    try {
      setList([]);
      let resp = await getCustomerForUsualName(dataFilter);
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const filterCustomerForPhoneNumber1 =  async () => { 

    try {
      setList([]);
      let resp = await getCustomerForPhoneNumber1(noMask(dataFilter));
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const filterCustomerForEmial1 =  async () => { 

    try {
      setList([]);
      let resp = await getCustomerForEmail1(dataFilter);
      if (resp.status === 200) {        
        setList((prev) => (
          [
            ...prev, 
            ...resp.data.clients
          ])
        );
      }
    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();      
    }
  }

  const setCustomerUpdate = (customer) => {
    
    for (let i = 0; i < list.length; i++) {
      if(list[i].id === customer.id) {
        list[i] = customer;
        return;
      }      
    }
  }

  const showDetail = () => {   
    setModalAction({ modal : false });
  }

  const change = () => { 
    setModalAction({ modal : false });
    setModal({
      ...modal,
      modal: true,
    })
  }


  const removeCustomer = async () => {

    try {

      const resp = await deleteCustomer(customer_changer.id);
      if (resp.status === 202) {
        setList(list.filter(item => item.id !== customer_changer.id));
        
        setModalAction({
          modal: false,
        }) 

        setFeedBack({
          ...feedBack,
          type: 'alert-info',
          title: 'Informação: ',
          message: resp.data.message
        }); 
        setTextOption(false);
        closeFeedBack();       
      }                

    } catch (error) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: error.response.data.message
      }); 
      closeFeedBack();     
    }   
  }

  const closeFeedBack = () => {
    
    setTimeout(() => {
      setFeedBack({
        ...feedBack,
        visible: 'd.none'
      });
    }, 5000);   

    clearTimeout(closeFeedBack);
  }

  const testFilter = () => {
    if (!dataFilter) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: 'Favor informar os dados para a consulta.'
      }); 
      closeFeedBack();
      return false
    }
    setFeedBack(feedBackDefault);
    return true;
  }

  const testDataFilter = () => {
    
    if (selectFilter.selectedType === 'Todos') {
      return true;
    }
    
    if (testFilter()) {
      if (selectFilter.selectedType === 'CPF') {
        return testCpf();
      }
      if (selectFilter.selectedType === 'CNPJ') {
        return testCnpj();
      }
      if (selectFilter.selectedType === 'E-mail') {
        return testEmail();
      } 
      return true;
    }
  }

  const testCpf = () => {
    if (!isValidCPF(dataFilter)) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: 'CPF informar é inválido.'
      }); 
      closeFeedBack();
      return false
    }
    setFeedBack(feedBackDefault);
    return true;
  }

  const testCnpj = () => {
    if (!isValidCNPJ(dataFilter)) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: 'CNPJ informar é inválido.'
      }); 
      closeFeedBack();
      return false
    }
    setFeedBack(feedBackDefault);
    return true;
  }
  
  const testEmail= () => {

    if (!isValidEMail(dataFilter)) {
      setFeedBack({
        ...feedBack,
        type: 'alert-danger',
        title: 'Atenção!',
        message: 'E-mail informar é inválido.'
      }); 
      closeFeedBack();
      return false
    }
    setFeedBack(feedBackDefault);
    return true;
  }


  return(

    <div className="container-sm">
      <h4 className='title-page'>Consultar clientes</h4>
      <Link to={"/customer/register"} type="button"><i className="fas fa-user-plus"></i> Novo Cliente</Link>
      <form className="table_customer" onSubmit={ filterCustomer }>
          <div className="row">
            <div className="form-group col-md-4">
              <MySelect data={ selectFilter } actionChange={ handleChangeFilterType }/>
            </div>
            <div className="form-group col-md-4">
              <label>{ selectFilter.selectedType }</label>
              <div className="input-group mb-3">
              <input 
                type="text" 
                class="form-control" 
                name="document_filter" 
                id="document_filter"
                onChange={ handleChangeFilter }
              />
              <button 
                className="btn btn-outline-secondary" 
                type="submit" 
              >
                 <i className='fa fa-search'> </i> Consultar
              </button>
            </div>
            </div>
          </div>    
        </form>
        {
          list.length > 0 ?
          <div className="table-responsive table_customer">
            <table className="table table-hover">
              <caption>Total: { list.length }</caption>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">CPF/CNPJ</th>
                  <th scope="col">Fone</th>
                  <th scope="col" >E-mail</th>
                </tr>
              </thead>
              <tbody>
               {
                  list.map((client)=>(
                    <tr key={client.id} className='cursor_pointer'>
                      <th scope="row" onClick={() => handleSelect(client) }>{client.id}</th>
                      <td onClick={() => handleSelect(client) }>{client.description}</td>
                      <td onClick={() => handleSelect(client) }>{ client.document_type === 1 ? setMaskCPF(client.document) : setMaskCNPJ(client.document)}</td>
                      <td onClick={() => handleSelect(client) }>{ setMaskTelefone(client.phone_number1) }</td>
                      <td onClick={() => handleSelect(client) }>{client.email1}</td>
                    </tr>   
                ))
               }
              </tbody>
            </table>
          </div>
          : ''
        }

      <CustomerChange 
        modal={modal} 
        toggle={toggle} 
        action={action}
        setAction={setAction}
        customer={ customer_changer }
        setCustomerUpdate={ setCustomerUpdate }
        document={testDocumentExist}
        setTestDocumentExist={setTestDocumentExist}
        />
      <ModalAction
        modal={modalAction}
        toggle={toggleAction} 
        detail={showDetail}
        change={change}
        remove={removeCustomer}
        data={customer_changer}
        setCustomerChanger={setCustomerChanger}
        textOption={textOption}
        setTextOption={setTextOption}
        />
      <Feedback feedBack={feedBack} />
    </div>       

  )
}

export default Customer;
