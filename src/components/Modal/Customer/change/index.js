import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RegisterCostumer from '../../../Customer/Register/index';
import { CustomerContextProvider } from '../../../../Contexts/Customer/CustomerContext';


const ModalConfirm = ({action, setAction, modal, toggle, customer, setCustomerUpdate, document, setTestDocumentExist}) => {

  return (
    <Modal isOpen={modal.modal} toggle={toggle} className='modal-dialog modal-xl'>
      { action === 'change' ? <ModalHeader toggle={toggle}> <h4 className='title-page'>Alterar Cliente</h4></ModalHeader> : '' }
      <ModalBody>
        <CustomerContextProvider>
          <RegisterCostumer 
              customer={customer} 
              action={action}
              setAction={setAction}
              setCustomerUpdate={setCustomerUpdate}
              document={document}
              setTestDocumentExist={setTestDocumentExist}
          /> 
        </CustomerContextProvider>
      </ModalBody>
      <ModalFooter >
        <Button id='acao1' className='btn-block btn-light' color="secondary"  onClick={toggle}>C A N C E L A R</Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default ModalConfirm;