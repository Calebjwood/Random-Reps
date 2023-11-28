import { Link } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import {  QUERY_USERS } from "../../utils/queries"
import Auth from "../../utils/auth";
import logo from '../../assets/images/logo.png';
import './style.scss';
import { useQuery } from "@apollo/client";


const Nav = () => {
  const [search, setSearch ] = useState('')
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([])
  const { data, loading } = useQuery(QUERY_USERS)
  const handleClose = () => setShow(false);
  
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
      <div>
        <img className="header-logo" src={logo} alt="Logo" />
      </div>

      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
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
          {Auth.loggedIn() && (
            <>
              <Link to="/profile">Profile</Link>
              <div className="logout-link" onClick={() => Auth.logout()}>Logout</div>
            </>
          )}
        </nav>
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
      </div>
    </header>
  );
}

export default Nav