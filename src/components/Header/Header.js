import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropDown from  'react-bootstrap/NavDropDown'

import { NavLink ,useNavigate} from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import{toast} from "react-toastify";
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';


const Header=()=> {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const account = useSelector(state => state.user.account);
  const dispatch = useDispatch();
  

  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate("/login");
  }
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
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">Quý đz</Navbar.Brand> */}
        <NavLink to ="/" className='navbar-brand'>Quý đz</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to ="/" className='nav-link'>Home</NavLink>
            <NavLink to ="/Users" className='nav-link'>User</NavLink>
            <NavLink to ="/Admins" className='nav-link'>Admin</NavLink>
            
            
          </Nav>
          <Nav>
            {isAuthenticated===false ? 
            <>
              <button className='btn-login' onClick={()=>handleLogin()}>Log in</button>
              <button className='btn-signup' onClick={()=>navigate('/register')}>Sign up</button>
            </>
            :
            <NavDropDown title="Settings" id="basic-nav-dropdown">
              <NavDropDown.Item>Profile</NavDropDown.Item>
              <NavDropDown.Item onClick={()=>handleLogout()}>Log out</NavDropDown.Item>
            </NavDropDown>
            }
            <Language/>

          </Nav>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;