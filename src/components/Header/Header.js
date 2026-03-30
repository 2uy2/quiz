import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router";

const Header=()=> {
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
            <button className='btn-login'>Log in</button>
            <button className='btn-signup'>Sign up</button>
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item >Login</NavDropdown.Item>
              <NavDropdown.Item >logout </NavDropdown.Item>
              <NavDropdown.Item >profile </NavDropdown.Item>

              
            </NavDropdown> */}
          </Nav>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;