import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FromContainer from "../components/FromContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation().search;

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const redirect = location ? location.split("=")[1] : "/";
  // const redirect = "/";

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <h1 className="mt-3">Sign In</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <FromContainer>
          <Form>
            <Form.Group controlId="email" className="py-3">
              <Form.Label>Email Address</Form.Label>

              <Form.Control
                className="bg-dark"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  console.log(email);
                  setEmail(e.target.value);
                }}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="py-3">
              <Form.Label>password Address</Form.Label>

              <Form.Control
                className="bg-dark"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="btn"
              variant="primary"
              className="mt-3"
              onClick={submitHandler}
            >
              Sign In
            </Button>

            <Row className="py-3">
              <Col>
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  {" "}
                  Register
                </Link>{" "}
              </Col>
            </Row>
          </Form>
        </FromContainer>
      )}
    </>
  );
};

export default LoginScreen;
