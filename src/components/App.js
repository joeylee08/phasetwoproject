import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../index.css';

import About from "./About";
import Instructions from "./Instructions";
import LeaderBoard from "./LeaderBoard";
import SudokuStore from "./SudokuStore";
import YourPuzzles from "./YourPuzzles";
import MainBody from "./MainBody";
import NavBar from "./NavBar";
import LoginModal from "./LoginModal"; 

function App() {
  const [showLoginModal, setShowLoginModal] = useState(!localStorage.getItem('isLoggedIn'));

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      setShowLoginModal(false);
    }
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem('isLoggedIn', true);
    setShowLoginModal(false);
  };

  const handleContinueAsGuest = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setShowLoginModal(true);
  };

  return (
    <>
      {showLoginModal && <LoginModal onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} />}
      {!showLoginModal && (
        <>
          <NavBar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/yourpuzzles" element={<YourPuzzles />} />
            <Route path="/sudokustore" element={<SudokuStore />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
