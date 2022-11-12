import "../../styles/Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import appLogo from "../../Images/reps-logo.png";

import { IoLogInOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

function Header({ userState, logoutUser, requests }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
    navigate("/");
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img className="app-logo" src={appLogo} alt="app logo"></img>
          </Navbar.Brand>
          <div className="desk-nav">
            <Nav className="me-auto">
              {!userState.auth && (
                <>
                  <Nav.Link className="nav-bar-link" href="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {userState.is_trainer && (
                <>
                  <Nav.Link className="nav-bar-link" href="/trainer/portal">
                    Trainer Portal
                    {requests && (
                      <Badge className="noti" pill>
                        {requests.length}
                      </Badge>
                    )}
                  </Nav.Link>
                  <Nav.Link className="nav-bar-link" href="/trainer/my-profile">
                    My Profile
                  </Nav.Link>
                </>
              )}
              {userState.is_client && (
                <>
                  <Nav.Link className="nav-bar-link" href="/client/my-sessions">
                    My Sessions
                  </Nav.Link>
                </>
              )}
              {userState.auth && (
                <>
                  <Nav.Link className="nav-bar-link" href="/" onClick={(e) => logout(e)}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
            {userState.trainer_avatar && (
              <img className="profile-picture" src={userState.trainer_avatar} alt="profile" />
            )}
            {userState.client_avatar && (
              <img className="profile-picture" src={userState.client_avatar} alt="profile" />
            )}
          </div>
        </Container>
      </Navbar>

      <div className="mobile-nav">
        <Nav className="me-auto mobile-icons">
          {!userState.auth && (
            <>
              <Nav.Link className="nav-mobile-link" href="/login">
                <IoLogInOutline />
                Login
              </Nav.Link>
            </>
          )}
          {userState.is_trainer && (
            <>
              <Nav.Link className="nav-mobile-link" href="/trainer/portal">
                <HiOutlineClipboardDocumentCheck />
                <div>
                  Trainer Portal
                  {requests && (
                    <Badge className="noti" pill>
                      {requests.length}
                    </Badge>
                  )}
                </div>
              </Nav.Link>
              <Nav.Link className="nav-mobile-link" href="/trainer/my-profile">
                <FaUserEdit />
                My Profile
              </Nav.Link>
            </>
          )}
          {userState.is_client && (
            <>
              <Nav.Link className="nav-mobile-link" href="/client/my-sessions">
                <IoCalendarOutline />
                My Sessions
              </Nav.Link>
            </>
          )}
          {userState.auth && (
            <>
              <Nav.Link className="nav-mobile-link" href="/" onClick={(e) => logout(e)}>
                <IoLogOutOutline />
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </>
  );
}

export default Header;
