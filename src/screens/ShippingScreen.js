import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FromContainer";
import { useHistory, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions.js";

const ShippingScreen = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div>
    <CheckoutSteps step1 step2/>
      <h1 className="text-center py-2">Shipping</h1>
      
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label className="my-2">Address</Form.Label>

            <Form.Control
              type="text"
              required
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label className="my-2">City</Form.Label>

            <Form.Control
              type="text"
              required
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label className="my-2">Postal-code</Form.Label>

            <Form.Control
              type="text"
              required
              placeholder="Enter postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label className="my-2">Country</Form.Label>

            <Form.Control
              type="text"
              required
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-5 mx-auto d-block"
          >
            Save & Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
