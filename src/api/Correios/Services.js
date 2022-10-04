import axios from 'axios';


export const getCep =  async (cep) => {
    
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response;
}

