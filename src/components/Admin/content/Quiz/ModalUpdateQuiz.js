import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiPlusCircleFill } from "react-icons/pi";
import { toast } from 'react-toastify';

import _ from "lodash";
import { putUpdateQuizForAdmin } from '../../../../services/apiServices';

const ModalUpdatQuiz= (props) =>{
    const {show,setShow,dataUpdate} = props;
    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const [difficulty,setDifficulty]=useState("");
    const[image,setImage]=useState("");
    const [previewImage,setPreviewImage] = useState("");

    useEffect(()=>{
        if(!_.isEmpty(dataUpdate)){
            //updatestate
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setDifficulty(dataUpdate.difficulty);
            setImage(dataUpdate.image);
            
            if(dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
            
        }
        console.log(dataUpdate.difficulty)
    },[props.dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setName("");
        setImage("");
        setDescription("");
        setDifficulty("");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();

    };


    const handleUploadImage=(event)=>{
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
        else {
            setPreviewImage("");
            setImage("");
        }
        
    }

  

    const handleUpdateSubmit=async()=>{
   
        let data = await putUpdateQuizForAdmin(dataUpdate.id,name,description,difficulty,image);
        console.log(data)
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
        {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button> */}

        <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user'>
            <Modal.Header closeButton>
            <Modal.Title>update a Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label  className="form-label">Name</label>
                        <input type="email" className="form-control" value={name}  onChange={(event)=>{setName(event.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label  className="form-label">Description</label>
                        <input type="text" className="form-control" value={description} onChange={(event)=>{setDescription(event.target.value)}} />
                    </div>
                
                   
                    <div className="col-md-4">
                        <label  className="form-label">Type</label>
                        <select  className="form-select" onChange={(event)=>{setDifficulty(event.target.value)}} value={difficulty} >
                            <option  value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                        
                    </div>
                    <div className='col-md-12'>
                        <label className='form-label label-upload' htmlFor='labelUpload'><PiPlusCircleFill/>Upload File Image</label>
                        <input type='file' hidden id='labelUpload' onChange={(event)=>handleUploadImage(event)}/>
                    </div>
                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage}/>  : <span>preview image</span> }
                        
                    </div>
                                
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>{handleUpdateSubmit()}}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ModalUpdatQuiz;