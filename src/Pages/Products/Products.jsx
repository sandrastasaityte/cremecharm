import React from "react";
import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "2rem", flex: 1 }}>
        <h1>Products</h1>
        <p>Here you will manage your products (CRUD operations).</p>
      </div>
    </div>
  );
};

export default Products;
