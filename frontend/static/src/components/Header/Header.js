import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

function Header({ superState, logoutUser }) {
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
              {!superState.auth && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
              {superState.auth && (
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
