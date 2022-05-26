import React from "react";
import "./product.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/shop/${product.id}`}>
        <div className="product-card-img">
          <img className="over" src={product.productImgs[1]} alt="" />
          <img src={product.productImgs[0]} alt="" />
        </div>
        <div>
          <div className=" product-card-info">
            <strong>{product.title}</strong>
            <p>Price</p>
            <h3>$ {product.price}</h3>
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
