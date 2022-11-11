import React, { useState, createContext } from "react";

export const CustomerContext = createContext()

export const CustomerContextProvider = (props) => {
    
    const dataDefault = {
        erro: 'Campo obrigatório!',
        validate: 'form-control'
    } 
    
    const statusFormDefault =  {       
        name_application_bb: dataDefault,
        id_application_bb: dataDefault,
        developer_application_key: dataDefault,
        client_id: dataDefault,
        client_secret: dataDefault,
        basic_copy: dataDefault,
        document_type: dataDefault,
        document: dataDefault,
        cnae: dataDefault,
        description: dataDefault,
        fantasy_name: dataDefault,
        date: dataDefault,  
        sexo: dataDefault,
        treatment: dataDefault,
        usual_name: dataDefault,
        address_type: dataDefault,
        address: dataDefault,
        address_number: dataDefault, 
        city: dataDefault,
        uf: dataDefault,
        address_complement: dataDefault,   
        district: dataDefault,
        cep: dataDefault,
        address_caracters: dataDefault,
        phone_number1: dataDefault,
        whats_app_phone1: dataDefault,
        phone_number2: dataDefault,
        whats_app_phone2: dataDefault,
        phone_number3: dataDefault,
        whats_app_phone3: dataDefault,
        email1: dataDefault,
        email2: dataDefault,
        site: dataDefault,
        facebook: dataDefault,
        instagram: dataDefault,
        bank: dataDefault,
        bank_agency: dataDefault,
        bank_number_account: dataDefault,
        number_convenio: dataDefault,
        number_wallet: dataDefault,
        number_wallet_variation: dataDefault,
        number_receipt_limit_days: dataDefault,
        description_type_title: dataDefault,        
        type_juros_mora: dataDefault,
        juros_mora_value: dataDefault,
        type_multa: dataDefault,
        multa_value: dataDefault,
        pix_indicator: dataDefault,
        text_email_address: dataDefault,
    }
    
    const [formStatus, setFormStatus] = useState(()=>statusFormDefault);

    return(
        <CustomerContext.Provider value={{ 
                formStatus, 
                setFormStatus,
                statusFormDefault 
            }}
        > 
            { props.children }
        </CustomerContext.Provider>
    );
}; 