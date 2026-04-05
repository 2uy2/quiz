import { useState } from "react";
import "./ManageQuiz.scss"
import Select from 'react-select';
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from 'react-toastify';
import { PiPlusCircleFill } from "react-icons/pi";
import TableQuiz from "./TableQuiz";
import Accordion from 'react-bootstrap/Accordion';
const ManageQuiz = ()=>{
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [type,setType]=useState("");
    const [image,setImage]=useState('');
    const [previewImage,setPreviewImage] = useState("");
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const handleChangeFile=(event)=>{
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0])); //dùng để tạo một đường dẫn tạm thời (URL) cho file (thường là ảnh) mà người dùng vừa chọn từ máy.
            setImage(event.target.files[0]);
        }
        else {
            setPreviewImage("");
            setImage("");
        }
    }
    const handleSubmit=async()=>{
        //validate
        if(!name||!description){
            toast.error('name/description is requested')
        }
        let res = await postCreateNewQuiz(description,name,type?.value,image);
        if(res && res.EC===0){
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
            setType("");
            setPreviewImage("")
        }
        else{
            toast.error(res.EM)
        }
    }
    return(
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            add new quizz
               
                            <fieldset  className="border rounded-3 p-3">
                                <legend>Personalia:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="your quiz name" value={name} onChange={(event)=>setName(event.target.value)} />
                                    <label >Name </label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="description" value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
                                    <label >Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"quiz style ..."}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    {/* <label className="mb-1">Upload image</label> */}
                                    <label className='form-label label-upload mb-1 btn btn-secondary' htmlFor='labelUpload'><PiPlusCircleFill/>Upload File Image</label>
                                    <input type="file" hidden className="form-control" id="labelUpload" onChange={(event)=>{handleChangeFile(event)}}/>
                                </div>
                                    <div className="col-md-12 d-flex justify-content-center align-items-center img-preview">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="preview"
                                            className="img-fluid rounded shadow"
                                            style={{ maxWidth: "250px", height: "auto" }}
                                        />
                                    ) : (
                                        <span>preview image</span>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-warning" onClick={()=>{handleSubmit()}}>save</button>

                                </div>
                                
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            
            </Accordion>
            
            <div className="list-detail">
                <TableQuiz/>
            </div>
        </div>
    )
}
export default ManageQuiz;