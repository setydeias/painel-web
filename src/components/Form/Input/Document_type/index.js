import React, { useState } from "react";

const Document_type = (props) => {

    const statusFormDefault = {
        erro: '',
        validate: 'form-control'
    } 

    const [formStatus, setFormStatus] = useState(()=>statusFormDefault);

    const testDocumentType = () => {
        if (!props.references.document_type.value) {
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

    return(
        <div className="col-md-4 mb-3">
          <label>Tipo Documento<span className='required_field'> *</span></label>
          <select 
            className={formStatus.validate}
            name="document_type"
            id="document_type"
            onChange={props.handleChangeDocumentType}
            onBlur={testDocumentType}
            required
          >
              <option value={1}>Física</option>
              <option value={2}>Jurídica</option>
          </select>
          <div className="invalid-feedback">
            { formStatus.erro }
          </div>
        </div>
    )
}

export default Document_type;