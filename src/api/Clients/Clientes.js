import axios from 'axios';
import Config from '../../globals/CompanySettings';


export const createTableCleinte = async (id) => {
    const response = await axios.get(`${Config.config.api_endpoint}database/create/table/client/${id}`);
    return response;
}

export const createDatabase = async (database_name) => {
    const response = await axios.get(`${Config.config.api_endpoint}database/create/${database_name}`);
    return response;
}

export const getCustomers =  async () => {
    
    const response = await axios.get(`${Config.config.api_endpoint}clients`);
    return response;
}

export const registerCustomer = async (data) => {
   
    const response = await axios.post(`${Config.config.api_endpoint}clients/create`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const updateCustomer = async (data) => {
   
    const response = await axios.patch(`${Config.config.api_endpoint}clients`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const updateDatatableCreated = async (data) => {

    console.log(data)

    const response = await axios.patch(`${Config.config.api_endpoint}clients/update/database_created`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    return response;
}

export const deleteCustomer = async (id) => {
   
    const response = await axios.delete(`${Config.config.api_endpoint}clients/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomer = async (id) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForDocument = async (document) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/document/${document}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForDescription = async (description) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/description/${description}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForUsualName= async (usual_name) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/usual_name/${usual_name}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForFantasyName= async (fantasy_name) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/fantasy_name/${fantasy_name}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForPhoneNumber1= async (phone_number1) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/phone_number1/${phone_number1}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}

export const getCustomerForEmail1= async (email1) => {

    const response = await axios.get(`${Config.config.api_endpoint}clients/filter/email1/${email1}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return response;
}


