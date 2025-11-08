import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Add Cake", path: "/add" },
    { name: "Cake List", path: "/cakes" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <div className="sidebar">
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={location.pathname === link.path ? "active" : ""}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
