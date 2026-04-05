import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import { deleteQuizForAmin } from '../../../../services/apiServices';
const ModalDeleteQuiz=(props)=> {
    const {show, setShow,dataDelete} = props;

    const handleClose = () => {setShow(false)};
    const handleSubmitDeleteUser= async()=>{
      let data = await deleteQuizForAmin(dataDelete.id);
      
        
        if(data&& data.EC===0){
            toast.success(data.EM);
            handleClose();
           
            await props.fetchQuiz()
            
        }
        if(data&& data.EC!==0){
            toast.error(data.EM);
            
        }
            
    }
    

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>are u sure delete it ? . Name: <b>{dataDelete&&dataDelete.name ? dataDelete.name :" " }</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;