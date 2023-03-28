import React from "react";
import { useNavigate } from "react-router";
// import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);

  const {userDD} = userDetails;

  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    console.log(e.target);

    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <div onClick={() => navigate("/")}>
            <Navbar.Brand>FLicker</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <div onClick={() => navigate("/cart")}>
                <Nav.Link>
                  {" "}
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
                </div>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                {/* <NavDropdown title={userDD.name} id="basic-nav-dropdown"> */}
                  <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div onClick={() => navigate("/login")}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In / Log In
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
