import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { Link, useParams, useLocation, useHistory} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { addToCart , removeFromCart} from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = useParams().id;
  const location = useLocation().search;
  const qty = location ? Number(location.split("=")[1]) : 1;

  console.log(qty);
  console.log(location);
  console.log(productId);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
   dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log("checkout");
    history.push("/login?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1 className="m-3">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.productId, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}{" "}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="btn"
                        variant="white"
                        onClick={() => {
                          removeFromCartHandler(item.productId);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="p-3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                {" "}
                subtotal {cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}{" "}
                items
              </h4>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
