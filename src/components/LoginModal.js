import React, { useState } from 'react';
import './LoginModal.css';

const URL = "http://localhost:3001/users";

function LoginModal({ onLoginSuccess, onContinueAsGuest }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginToggle = () => {
    setError('');
    setIsLogin(!isLogin);
  };

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
      if (isLogin) {
        // Check if the user exists in your database
        const response = await fetch(`${URL}/${lowercaseEmail}`);
        if (response.status !== 200) {
          setError('User not found. Please register first.');
          return;
        }

        const userData = await response.json();
        if (userData.password !== password) {
          setError('Invalid password.');
          return;
        }

        onLoginSuccess(userData);
      } else {
        // Check if the user already exists in your database
        const response = await fetch(`${URL}/${lowercaseEmail}`);
        if (response.status === 200) {
          setError('User already exists. Please login.');
          return;
        }

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

        const registerResponse = await fetch(URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        if (registerResponse.ok) {
          onLoginSuccess(newUser);
        } else {
          const errorMessage = await registerResponse.text();
          setError(errorMessage);
        }
      }
    } catch (err) {
      setError('An error occurred.');
      console.error(err);
    }
  };

  return (
    <div className="login-modal">
      <button onClick={handleLoginToggle}>
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

