import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";

const List = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${url}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="list">
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <img src={`${url}${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
