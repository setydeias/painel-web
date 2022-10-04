import React from 'react';

const PersonNotes = (props) => {
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      props.setCustomer({ ...props.customer, [name]: value });
    };

    return(
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                <label>Anotações</label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="notes" 
                      id='notes'
                      onChange={handleChange}
                      value={ props.customer.notes != null ?  props.customer.notes : ''}
                      placeholder=''
                    />
                </div>
            </div>
        </>
    )
}

export default PersonNotes;