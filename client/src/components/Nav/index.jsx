import { Link } from "react-router-dom";
import { Form, Button, Modal, Navbar, Nav, } from "react-bootstrap";
import { useState } from "react";
import {  QUERY_USERS } from "../../utils/queries"
import Auth from "../../utils/auth";
import logo from '../../assets/images/logo.png';
import './style.scss';
import { useQuery } from "@apollo/client";


const Navigation = () => {
  const [search, setSearch ] = useState('')
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([])
  const { data, loading } = useQuery(QUERY_USERS)
  const handleClose = () => setShow(false);
  const isLoggedIn = Auth.loggedIn();
  
  const handleClick = (e) => {
    e.preventDefault()
     let array = []
    
    for(let i = 0; i < data.users.length; i++){
    if(data.users[i].username.includes(search))
      array.push(data.users[i])
    }
    if(array){
    setUserData(array)
  }
    
   setShow(true);
    
    
  }

  return (
    <header>
      <Navbar expand="sm" className="custom-nav">
        <Navbar.Brand>
          <img className="header-logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto my-2 my-sm-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link className="logout-link" as={Link} to={"/"} onClick={() => Auth.logout()}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex ml-auto" style={{ paddingLeft: '1rem' }} >
            <Form.Control
              type="search"
              placeholder="Search Username"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" type="submit" onClick={(e) => handleClick(e) }>Search </Button>
          </Form>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
                    <Modal.Title>Search User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 {userData.map((user) => (
                    <Link to={'/profile/' + user._id}>
                    <h5>{user.username}</h5>
                    </Link>
                 ))}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
      
    </header>
  );
}

export default Navigation