import React, { useState } from 'react';
import './LoginModal.css';

const URL = "http://localhost:3001/users";

function LoginModal({ onLoginSuccess, onContinueAsGuest }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const lowercaseEmail = email.toLowerCase();

    if (!lowercaseEmail.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const newUser = {
        id: lowercaseEmail,
        username: lowercaseEmail.split('@')[0],
        email: lowercaseEmail,
        password,
        points: 0,
        consumables: [],
        activePuzzle: {},
        saved: []
      };

      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError('An error occurred.');
      console.error(err);
    }
  };

  return (
    <div className="login-modal">
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create Account' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {!isLogin && <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />}
        <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={onContinueAsGuest}>Continue as Guest</button>
    </div>
  );
}

export default LoginModal;
