import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { PiPlusCircleFill } from "react-icons/pi";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser,getUserWithPaginate} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdate";
import ModalViewUser from "./ModalView";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUser = (props) =>{
    const LIMIT_USER=5;
    const [pageCount,setPageCount]=useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalCreateUser,setModalCreateUser]=useState(false);
    const [showModalUpdateUser,setShowModalUpdateUser] =useState(false);
    const [showModalViewUser,setShowModalViewUser] =useState(false);
    const [showModalDeleteUser,setShowModalDeleteUser] = useState(false);
    const[dataUpdate,setDataUpdate] = useState({});
    const[dataDelete,setDataDelete] = useState({});
    const [listUser,setListUser] = useState([]);
    useEffect(()=>{
        // fetchListUser();
        fetchListUserWithPaginate(1);
        
    },[]);
    const fetchListUser = async()=>{
        let res =await getAllUser();
        if(res.EC===0){
            setListUser(res.DT)
        }
    }
    const fetchListUserWithPaginate = async(page,)=>{
        setCurrentPage(page);
        let res =await getUserWithPaginate(page,LIMIT_USER);
        if(res.EC===0){
            console.log(res.DT)
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
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
                    {/* <TableUser listUser={listUser} handleClickBtnUpdate={handleClickBtnUpdate} handleClickView={handleClickView} handleClickBtnDelete={handleClickBtnDelete}/>  */}
                    <TableUserPaginate listUser={listUser} handleClickBtnUpdate={handleClickBtnUpdate} handleClickView={handleClickView} handleClickBtnDelete={handleClickBtnDelete} fetchListUserWithPaginate={fetchListUserWithPaginate} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setModalCreateUser} fetchListUserWithPaginate={fetchListUserWithPaginate}/>
                <ModalUpdateUser show={showModalUpdateUser}  setShow={setShowModalUpdateUser} dataUpdate={dataUpdate} fetchListUserWithPaginate={fetchListUserWithPaginate} resetUpdateData={resetUpdateData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <ModalViewUser show={showModalViewUser}  setShow={setShowModalViewUser} dataUpdate={dataUpdate}  resetUpdateData={resetUpdateData}/>
                <ModalDeleteUser show={showModalDeleteUser} setShow={setShowModalDeleteUser} dataDelete={dataDelete} fetchListUserWithPaginate={fetchListUserWithPaginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>

        </div>
    )
}
export default ManageUser;