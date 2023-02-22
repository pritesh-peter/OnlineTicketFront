import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';



const CustomNavbar = ()=> {

  const userContextData = useContext(userContext)

  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const[login,setLogin]=useState(false);
  const[user,setUser] = useState(undefined);

  useEffect(()=>{

    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())
  },[login])


  const toggle = () => setIsOpen(!isOpen);

  const logout =() => {
    doLogout(()=>{
      setLogin(false);
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/")
    })
  
  }

  return (
    <div>
      <Navbar color="dark" expand="md" fixed="" dark>
        <NavbarBrand tag={ReactLink} to="/">ZFX</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">Movies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Location</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Services</DropdownItem>
                <DropdownItem>Contact us</DropdownItem>
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem>Reset</DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        <Nav navbar>
{
  login && (
    <>
    <NavItem>
  <NavLink tag={ReactLink} to="/user/user-info">
    Profile
  </NavLink>
</NavItem>
<NavItem>
  <NavLink onClick={logout}>
    Logout
  </NavLink>
</NavItem>
<NavItem>
  <NavLink tag={ReactLink} to="/user/dashboard">
    {user.email}
  </NavLink>
</NavItem>
</>
  )
}

{
  !login && (
    <>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
    </>
  )
}
        </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
  }

export default CustomNavbar;;