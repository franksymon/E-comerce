import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./purchases.css";

const Purchases = () => {
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const [purchases, setPurchase] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
        getConfig()
      )
      .then((res) => {
        //console.log(res)
        setPurchase(res.data.data.purchases);
      });
  }, []);

  //console.log(purchases)

  return (
    <section className="purchase ">
      <dir className="purchase-ruta">
        <Link to="/">
          <p>Home</p>
        </Link>
        <div className="separator"> </div>
        <p>
          <b>Purchase</b>
        </p>
      </dir>

      <h3>My purchases</h3>

      <ul className="purchase-container">
        {purchases &&
          purchases?.map((purchase) => (
            <li key={purchase.id}>
              <div>
                {purchase.cart.products.map((e) => (
                  <div key={e.id} className="purchase-info">
                    <p>{e.title}</p>
                    <small>{e.productsInCart.quantity}</small>
                    <p className="purchase-preci">$ {e.price}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Purchases;
