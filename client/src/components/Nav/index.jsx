import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { SEARCH_USERS } from "../../utils/queries"
import Auth from "../../utils/auth";
import logo from '../../assets/images/logo.png';
import './style.scss';
import { useQuery } from "@apollo/client";

const Nav = () => {
  const [search, setSearch ] = useState('')
  const { data, loading } = useQuery(SEARCH_USERS, {variables: {username:search}})
  const handleClick = (e) => {
    e.preventDefault()
    
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
      </div>
    </header>
  );
}

export default Nav