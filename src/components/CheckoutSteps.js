import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
// import {LinkContainer} from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const navigate = useNavigate();

  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <div onClick={() => navigate("/login")}>
            <Nav.Link>Login</Nav.Link>
          </div>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <div onClick={() => navigate("/shipping")}>
            <Nav.Link>Shipping</Nav.Link>
          </div>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <div onClick={() => navigate("/payment")}>
            <Nav.Link>Payment</Nav.Link>
          </div>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <div onClick={() => navigate("/placeorder")}>
            <Nav.Link>Place Order</Nav.Link>
          </div>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
