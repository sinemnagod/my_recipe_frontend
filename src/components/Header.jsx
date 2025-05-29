import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const onSearchSubmit = e => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(q)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSendRecipeClick = e => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/recipe/new');
    } else {
      navigate('/login', { state: { from: '/recipe/new' } });
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/logo.jpeg" alt="My Recipe Logo" className="logo" />
      </Link>

      <form className="search-form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search recipes..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      <div className="header-buttons">
        <button className="btn send-recipe" onClick={handleSendRecipeClick}>
          Send Recipe
        </button>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/signup" className="btn signup-btn">Sign Up</Link>
          </>
        ) : (
          <>
            <img
              src="/user-icon.png"
              alt="User"
              className="user-icon"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            />
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
