import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { PiPlusCircleFill } from "react-icons/pi";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdate";
import ModalViewUser from "./ModalView";
import ModalDeleteUser from "./ModalDeleteUser";


const ManageUser = (props) =>{
    const [showModalCreateUser,setModalCreateUser]=useState(false);
    const [showModalUpdateUser,setShowModalUpdateUser] =useState(false);
    const [showModalViewUser,setShowModalViewUser] =useState(false);
    const [showModalDeleteUser,setShowModalDeleteUser] = useState(false);
    const[dataUpdate,setDataUpdate] = useState({});
    const[dataDelete,setDataDelete] = useState({});
    const [listUser,setListUser] = useState([]);
    useEffect(()=>{
        fetchListUser();
        
    },[]);
    const fetchListUser = async()=>{
        let res =await getAllUser();
        if(res.EC===0){
            setListUser(res.DT)
        }
    }
    const handleClickBtnUpdate =(user)=>{
        setShowModalUpdateUser(true);
        setDataUpdate(user)
    }
    const handleClickView =(user)=>{
        setShowModalViewUser(true);
        setDataUpdate(user)
    }
    const handleClickBtnDelete =(user)=>{
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    const resetUpdateData = ()=>{
        setDataUpdate({});
    }
    return (
        <div className="manage-user-container"> 
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={()=>setModalCreateUser(true)} ><PiPlusCircleFill/>Add new user</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUser={listUser} handleClickBtnUpdate={handleClickBtnUpdate} handleClickView={handleClickView} handleClickBtnDelete={handleClickBtnDelete}/> 
                    
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setModalCreateUser} fetchListUser={fetchListUser}/>
                <ModalUpdateUser show={showModalUpdateUser}  setShow={setShowModalUpdateUser} dataUpdate={dataUpdate} fetchListUser={fetchListUser} resetUpdateData={resetUpdateData} />
                <ModalViewUser show={showModalViewUser}  setShow={setShowModalViewUser} dataUpdate={dataUpdate}  resetUpdateData={resetUpdateData}/>
                <ModalDeleteUser show={showModalDeleteUser} setShow={setShowModalDeleteUser} dataDelete={dataDelete}/>
            </div>

        </div>
    )
}
export default ManageUser;