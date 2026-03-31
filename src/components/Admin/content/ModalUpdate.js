import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiPlusCircleFill } from "react-icons/pi";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from "lodash";

const ModalUpdateUser= (props) =>{
    const {show,setShow,dataUpdate} = props;
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[username,setUsername]=useState("");
    const[role,setRole]=useState("USER");
    const[image,setImage]=useState("");
    const [previewImage,setPreviewImage] = useState("");

    useEffect(()=>{
        if(!_.isEmpty(dataUpdate)){
            //updatestate
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.username);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            
            if(dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
            
        }
    },[props.dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("");
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

  

    const handleUpdateUser=async()=>{
   
       

        let data = await putUpdateUser(dataUpdate.id,username,role,image);
      
        
        if(data&& data.EC===0){
            toast.success(data.EM);
            handleClose();
            await props.fetchListUser()
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
            <Modal.Title>update a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label  className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} disabled={true} onChange={(event)=>{setEmail(event.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label  className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} disabled={true} onChange={(event)=>{setPassword(event.target.value)}} />
                    </div>
                
                    <div className="col-md-6">
                        <label  className="form-label">User name</label>
                        <input type="text" className="form-control" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
                    </div>
                    <div className="col-md-4">
                        <label  className="form-label">Role</label>
                        <select  className="form-select" onChange={(event)=>{setRole(event.target.value)}} value={role}>
                            <option  value="USER">USER</option>
                            <option value="ADMIN">Admin</option>
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
            <Button variant="primary" onClick={()=>{handleUpdateUser()}}>
                Save 
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ModalUpdateUser;