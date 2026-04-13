import SideBar from "./SideBar";
import "./Admin.scss"
import {FaBars} from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
 import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-toastify/dist/ReactToastify.css';
import Language from "../Header/Language";
import NavDropDown from  'react-bootstrap/NavDropDown';
import { useDispatch, useSelector } from 'react-redux';
import{toast} from "react-toastify";
import { doLogout } from '../../redux/action/userAction';
import { logout } from "../../services/apiServices";
import { NavLink ,useNavigate} from "react-router";
const Admin =(props) =>{
    const [collapsed,setCollapsed] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const account = useSelector(state => state.user.account);
  const dispatch = useDispatch();
  

  const navigate = useNavigate();
    const handleLogout=async()=>{
    let rs =await logout(account.email,account.refresh_token);
    if(rs && rs.EC===0){
      //clear data redux
      dispatch(doLogout())
      navigate("/login")
    }
    else{
      toast.error(rs.EM)
      
    }
  }
    return(
        
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                <span  onClick= {()=>setCollapsed(!collapsed)}>
                    <FaBars className="leftside"/>
                </span>
                <div className="rightside">
                    <NavDropDown title="Settings" id="basic-nav-dropdown">
                        <NavDropDown.Item>Profile</NavDropDown.Item>
                        <NavDropDown.Item onClick={()=>handleLogout()}>Log out</NavDropDown.Item>
                    </NavDropDown>
                        
                    <Language/>
                </div>
                    
                    
                </div>
                
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet/>
                    </PerfectScrollbar>
                    
                </div>
                   
                
                
                
                    
            </div>
                
        </div>  
            
      
    )
}
export default Admin;