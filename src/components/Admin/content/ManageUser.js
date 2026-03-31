import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { PiPlusCircleFill } from "react-icons/pi";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) =>{
    const [showModalCreateUser,setModalCreateUser]=useState(false);

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
                    <TableUser/> 
                    
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setModalCreateUser}/>
            </div>

        </div>
    )
}
export default ManageUser;