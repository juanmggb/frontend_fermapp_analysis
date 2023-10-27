import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BASE_URL } from "../../constants/constants";

function Header() {
  const loginUser = useSelector((state) => state.loginUser);

  const { userInfo } = loginUser;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userInfo]);

  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setImageUrl(userInfo.image);
    }
  }, [loginUser, userInfo]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand style={{ color: "white !important" }}>
            GAFerm
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/simulation">
                  <Nav.Link>Simulation</Nav.Link>
                </LinkContainer>

                <NavDropdown title="Optimization" id="optimization">
                  <LinkContainer to="/optimization">
                    <NavDropdown.Item>Bioreactor</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#action/3.2">
                    Media composition
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Visualization" id="visualization">
                  <LinkContainer to="/visualization">
                    <NavDropdown.Item>Bioreactor</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#action/3.3">
                    Media Composition
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Users" id="users">
                  <LinkContainer to="/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create-user">
                    <NavDropdown.Item>Create User</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            )}
          </Nav>

          {/* Account section with image and name */}
          {isAuthenticated && (
            <Nav className="ml-auto">
              <LinkContainer to="/account">
                <Nav.Link>
                  <img
                    src={`${BASE_URL}${imageUrl}`}
                    alt="Account"
                    width={32}
                    height={32}
                    className="rounded-circle mx-3"
                  />
                  <span className="ml-2">{username}</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
