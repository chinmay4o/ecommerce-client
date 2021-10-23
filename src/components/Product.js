import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating.js";
import {Link} from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name} </strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>

      <Card.Text as="div">
        <h4>${product.price}</h4>
      </Card.Text>
    </Card>
  );
};

export default Product;
