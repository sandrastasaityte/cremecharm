import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const List = () => {
  const url = "http://localhost:4000";
  const [cakes, setCakes] = useState([]);

  const fetchCakes = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if(res.data.success) setCakes(res.data.data);
    } catch(err){ toast.error("Server error"); }
  }

  const removeCake = async id => {
    if(!window.confirm("Delete this cake?")) return;
    try {
      const res = await axios.post(`${url}/api/food/remove`, {id});
      if(res.data.success) { toast.success(res.data.message); fetchCakes(); }
      else toast.error("Error");
    } catch(err) { toast.error("Server error"); }
  }

  useEffect(()=>{ fetchCakes(); }, []);

  return (
    <div className="cake-list">
      <h2>All Cakes</h2>
      <div className="cake-grid">
        {cakes.map(cake=>(
          <div key={cake._id} className="cake-card">
            <img src={cake.image?`${url}/images/${cake.image}`:assets.upload_area} alt={cake.name} />
            <h3>{cake.name}</h3>
            <p>{cake.category}</p>
            <p>${cake.price}</p>
            <button onClick={()=>removeCake(cake._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default List;
