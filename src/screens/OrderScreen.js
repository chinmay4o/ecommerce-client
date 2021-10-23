import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useHistory, Link, useParams } from "react-router-dom";
import {getOrderDetails} from "../actions/orderActions.js"

const OrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails;

  if(!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
  
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [])


  return loading ? <Loader /> : error ? <Message>{error}</Message> : <> 
     <h1 className="py-3">Order {order._id}</h1>
     <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3">
              <h2 className="py-2">Shipping</h2>
              <p><strong>Name: </strong> {order.userId.name}</p>
              
              <p>Email:   <a href={`mailto:${order.userId.email}`}>{order.userId.email}</a></p>
            
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}

            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2 className="py-2">Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2 className="py-2">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
};

export default OrderScreen;
