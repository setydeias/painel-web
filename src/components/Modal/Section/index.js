import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalSection = (props) => {

  return (
    <div>     
      <Modal isOpen={props.modal.modal} toggle={props.toggle} className=''>
        <ModalHeader toggle={props.toggle}>{props.modal.titulo}</ModalHeader>
        <ModalBody>
          { props.modal.texto }
        </ModalBody>
        <ModalFooter>
          <Button id='action_1' color="info"  onClick={props.resetSession}>{props.modal.acao1}</Button>{' '}
          <Link to={"/logout"} id='link_logout'>
            <Button id='action_2' color="info"  onClick={props.toggle}>{props.modal.acao2}</Button>{' '}
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSection;