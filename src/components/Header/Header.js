import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropDown from  'react-bootstrap/NavDropDown'

import { NavLink ,useNavigate} from "react-router";
import { useSelector } from 'react-redux';

const Header=()=> {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account);
  

  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate("/login");
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
              <NavDropDown.Item>Log out</NavDropDown.Item>
              <NavDropDown.Item>Profile</NavDropDown.Item>
            </NavDropDown>
            }

          </Nav>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;