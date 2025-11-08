import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if(res.data.success) setOrders(res.data.data);
    } catch(err){ toast.error("Server error"); }
  }

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status });
      if(res.data.success) fetchOrders();
      else toast.error("Error updating status");
    } catch(err){ toast.error("Server error"); }
  }

  useEffect(()=>{ fetchOrders(); }, []);

  return (
    <div className="orders">
      <h2>Orders</h2>
      {orders.map(order=>(
        <div key={order._id} className="order-card">
          <img src={assets.parcel_icon} alt="Parcel" />
          <div>
            <p><b>Items:</b> {order.items.map(i=>`${i.name} x ${i.quantity}`).join(", ")}</p>
            <p><b>Customer:</b> {order.address_firstName} {order.address_lastName}</p>
            <p><b>Address:</b> {order.address.street}, {order.address.city}</p>
            <p><b>Total:</b> ${order.amount}</p>
            <select value={order.status} onChange={e=>updateStatus(order._id,e.target.value)}>
              {["Food Processing","Out for delivery","Delivered"].map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Order;
