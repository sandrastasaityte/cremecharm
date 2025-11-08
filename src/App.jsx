import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Add from './Pages/Add/Add.jsx'
import Order from './Pages/Order/Order.jsx'
import List from './Pages/List/List.jsx'
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => setIsLoggedIn(false);

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app-container">
          <Navbar onLogout={logout} />
          <div className="main-content">
            <Sidebar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<Add />} />
                <Route path="/cakes" element={<List />} />
                <Route path="/orders" element={<Order />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={()=>setIsLoggedIn(true)} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  )
}

export default App;
