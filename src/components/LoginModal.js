import React, { useState } from 'react';
import './LoginModal.css';

const URL = "http://localhost:3001/users/"

function LoginModal({ onLoginSuccess, onContinueAsGuest }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return alert("Please enter a valid email")
    if (!password.trim()) return alert("Please enter a valid password")
    
    const urlEnd = isLogin ? email : '';

    const newUser = {
      "id": email,
      "username": email.slice(0, email.indexOf("@")),
      "email": email,
      "password": password,
      "points": 0,
      "consumables": [],
      "activePuzzle": {},
      "saved": [],
      "completed": []
    }

    const configObj = isLogin ? {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    } : {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }

    try {
      const response = await fetch(`${URL}/${urlEnd}`, configObj);
      const userObj = await response.json();

      if (response.ok) onLoginSuccess(userObj);
      else {
        setError('An error occurred during login/registration.');
        console.error(error)
      }
      
    } catch(err) {
      setError('An error occurred during login/registration.');
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="login-modal">
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create Account' : 'Login'}
      </button>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
      </form>
      
      <button onClick={onContinueAsGuest}>Continue as Guest</button>
    </div>
  );
}

export default LoginModal;
