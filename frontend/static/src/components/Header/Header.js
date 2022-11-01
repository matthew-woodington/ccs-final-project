import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header({ userState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">App Logo</Navbar.Brand>
          <div id="basic-navbar-nav">
            <Nav className="me-auto">
              {!userState.auth && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
              {userState.auth && (
                <>
                  <Nav.Link href="/" onClick={(e) => logout(e)}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
