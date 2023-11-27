import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

import logo from '../../assets/images/logo.png';

import './style.scss';

export default function Nav() {

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