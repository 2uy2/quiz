import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink ,useNavigate} from "react-router";

const Header=()=> {
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
            <button className='btn-login' onClick={()=>handleLogin()}>Log in</button>
            <button className='btn-signup'>Sign up</button>
           

              
         
          </Nav>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;