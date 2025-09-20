import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header ()  {
  const navigate = useNavigate();


const handleLoginClick = () => {
  navigate('/login');
};
  return (
    <header className="lemon-header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🍋</span>
          <span className="logo-text" >Web App Generator</span>
        </div>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="profile-btn" onClick={handleLoginClick}>
            <div className="avatar">👤</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
