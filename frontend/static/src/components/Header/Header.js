import "../../styles/Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import appLogo from "../../Images/reps-logo.png";

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
            <img className="app-logo" src={appLogo}></img>
          </Navbar.Brand>
          <div className="desk-nav">
            <Nav className="me-auto">
              {!userState.auth && (
                <>
                  <Nav.Link className="nav-link" href="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {userState.is_trainer && (
                <>
                  <Nav.Link className="nav-link" href="/trainer/portal">
                    Trainer Portal
                    {requests && (
                      <Badge className="noti" pill>
                        {requests.length}
                      </Badge>
                    )}
                  </Nav.Link>
                  <Nav.Link className="nav-link" href="/trainer/my-profile">
                    My Profile
                  </Nav.Link>
                </>
              )}
              {userState.auth && (
                <>
                  <Nav.Link className="nav-link" href="/" onClick={(e) => logout(e)}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
            {userState.trainer_avatar && (
              <img
                className="profile-picture"
                src={userState.trainer_avatar}
                alt="profile picture"
              />
            )}
            {userState.client_avatar && (
              <img
                className="profile-picture"
                src={userState.client_avatar}
                alt="profile picture"
              />
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
