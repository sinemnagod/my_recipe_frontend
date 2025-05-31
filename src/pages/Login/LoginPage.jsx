import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../index.css';

const LoginPage = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const redirectPath = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('email', formData.email);
      params.append('password', formData.password);
  
      const res = await fetch('https://myrecipeapi-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: params.toString(),
      });
  
      if (res.ok) {
        const data = await res.json();
      
        localStorage.setItem('token', data.token);
      
        document.cookie = `userId=${data.id}; path=/; SameSite=Lax`;
      
        navigate(redirectPath);
      }
      
    } catch (err) {
      alert(err.message);
    }
  };
  

  return (
    <>
      <Header />
      <main className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
