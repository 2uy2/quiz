import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";
const TableUser=(props)=>{
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
    return(
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length>0 && listUser.map((item,index)=>{
                        return(
                             <tr key={`table-user-${index}`}>
                                <td scope="row">{index+1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <buttom className="btn btn-secondary">View</buttom>
                                    <buttom className="btn btn-warning mx-3">Update</buttom>
                                    <buttom className="btn btn-danger">Delete</buttom>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length===0 && <tr><td colSpan={'4'}>Not found data</td></tr>}
                   
                  
                </tbody>
            </table>
        </>
    )
}
export default TableUser;