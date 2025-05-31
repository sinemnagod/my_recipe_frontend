import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './SignUpPage.css'; 


const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('https://myrecipeapi-production.up.railway.app/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            name: firstName,
            surname: lastName,
            username,
            email,
            password,
          }),
        });
  
        if (res.ok) {
          alert('Signup successful!');
          navigate('/login');
        } else {
          alert('Signup error. Please try again.');
        }
      } catch (err) {
        console.error('Signup failed:', err);
        alert('Signup failed. Check console for details.');
      }
    };
  
    return (
      <>
        <Header />
        <main className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </main>
        <Footer />
      </>
    );
  };

  export default SignUpPage;