import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalAlert = ({modal, toggle, action}) => {

  return (
    <div>     
      <Modal isOpen={modal.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modal.title}</ModalHeader>
        <ModalBody>
          { modal.text }          
        </ModalBody>
        <ModalFooter>
            <Button id='acao1_alert' color="success"  onClick={action}>Sim</Button>{' '}
            <Button id='acao2_alert' color="danger"  onClick={toggle}>Não</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalAlert;