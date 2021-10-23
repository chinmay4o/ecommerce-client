import React, { useEffect } from "react";
import Product from "../components/Product.js";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Message from "../components/Message"
import Loader from "../components/Loader"
// import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((ele) => {
            return (
              <Col key={ele._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{ele.name}</h3> */}
                <Product product={ele} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
