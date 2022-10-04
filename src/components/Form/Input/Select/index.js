import React from 'react';

const MySelect = ({data, actionChange}) => { 
    
    return(
        <div className="form-group">
            <label>{data.label_text}</label>
            <select 
                className={`form-control ${data.class}`} 
                id={data.id} 
                name={data.name}
                onChange={actionChange}
            >
                <option value='Código'>Código</option>
                <option value='CPF'>CPF</option>
                <option value='CNPJ'>CNPJ</option>
                <option value='Nome'>Nome</option>
                <option value='Nome usual'>Nome usual</option>
                <option value='Razão Social'>Razão Social</option>
                <option value='Nome Fantasia'>Nome Fantasia</option>
                <option value='Telefone'>Telefone</option>
                <option value='E-mail'>E-mail</option>
                <option value='Todos'>Todos</option>
            </select>
        </div>
    );
}

export default MySelect;