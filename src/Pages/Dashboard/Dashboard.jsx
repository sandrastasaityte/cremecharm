import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const url = "http://localhost:4000";
  const [stats, setStats] = useState({ customers:0, orders:0, sold:0, cakes:0 });

  const fetchStats = async () => {
    try {
      const [ordersRes, cakesRes, customersRes] = await Promise.all([
        axios.get(`${url}/api/order/list`),
        axios.get(`${url}/api/food/list`),
        axios.get(`${url}/api/customers/list`)
      ]);
      if (ordersRes.data.success && cakesRes.data.success && customersRes.data.success) {
        const soldCount = ordersRes.data.data.reduce(
          (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0
        );
        setStats({
          customers: customersRes.data.data.length,
          orders: ordersRes.data.data.length,
          sold: soldCount,
          cakes: cakesRes.data.data.length
        });
      }
    } catch(err) { console.error(err); }
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div className="dashboard">
      <h1>CremeCharm Admin Panel</h1>
      <div className="dashboard-stats">
        <div className="card"><h2>{stats.customers}</h2><p>Customers</p></div>
        <div className="card"><h2>{stats.orders}</h2><p>Orders</p></div>
        <div className="card"><h2>{stats.sold}</h2><p>Sold Cakes</p></div>
        <div className="card"><h2>{stats.cakes}</h2><p>Uploaded Cakes</p></div>
      </div>
    </div>
  );
};

export default Dashboard;
