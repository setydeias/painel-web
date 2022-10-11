import React, { useState } from 'react';
import './style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PersonDetails from '../../Customer/PersonDetails';

const ModalActions = ({ modal, toggle, change, remove, data }) => {

  const [textOption, setTextOption] = useState(false);
  const toggleTextOption = () => setTextOption(!textOption);


  return (
    <div>     
      <Modal isOpen={modal.modal} toggle={toggle} className="modal-dialog modal-lg">
        <ModalHeader toggle={toggle}>{modal.titulo}Detalhes</ModalHeader>
        <ModalBody>
          <PersonDetails data={data} />
        </ModalBody>
        <ModalFooter>           
            { !textOption ? 
              <span>
                <Button id='actionChange' className="btn btn-secondary btn-sm margin-left-5px" onClick={change}>Alterar</Button>
                <Button id='actionRemuve' className="btn btn-danger btn-sm margin-left-5px"  onClick={toggleTextOption}>Excluir</Button>
              </span>                
                : 
              <span>Confirmar <b>EXCLUSÃO</b> ? 
                <Button id='acao1' color="success" className='btn-sm margin-left-5px' onClick={remove}>Sim</Button>
                <Button id='acao2' color="secondary" className='btn-sm margin-left-5px' onClick={toggleTextOption}>Não</Button>
              </span>
            }          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalActions;