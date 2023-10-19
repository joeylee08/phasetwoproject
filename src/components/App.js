import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import HiddenNavBar from "./HiddenNavBar";
import Router from './Router'; 
import { useNavigate } from 'react-router-dom';
import '../index.css';

const currentUserURL = "http://localhost:3001/currentUser"
const allPuzzlesURL = "http://localhost:3001/puzzles"

function App() {
  const [showApp, setShowApp] = useState(false);
  const [allPuzzles, setAllPuzzles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isUserActive') === 'true') setShowApp(true)

    fetch(allPuzzlesURL)
      .then(res => res.json())
      .then(puzzles => setAllPuzzles(puzzles))
  }, [])

  const putCurrentUser = (userObj) => {
    fetch(currentUserURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    })
    .then(response => {
      if (!response.ok) throw response.statusText
    })
    .catch(err => alert("Failed to update current user."))
  }

  const handleSetCurrentUser = (userObj) => {
    const randomPuzzle = allPuzzles[Math.floor(Math.random() * 250) + 1]

    userObj.activePuzzle.puzzle = userObj.saved[0] || randomPuzzle
    userObj.activePuzzle.answers = userObj.activePuzzle.answers || userObj.activePuzzle.puzzle.answers
    userObj.activePuzzle.solution = userObj.activePuzzle.puzzle.solution
    
    localStorage.setItem('isUserActive', true)
    localStorage.setItem('currentUser', JSON.stringify(userObj))

    putCurrentUser(userObj)
  }

  const handleLoginSuccess = (userObj) => {
    setShowApp(true);
    handleSetCurrentUser(userObj)
  };

  const handleContinueAsGuest = () => {
    fetch("http://localhost:3001/users/guestuser@gmail.com")
    .then(response => {
      if (response.ok) return response.json();
      else throw (response.statusText)
    })
    .then(userObj => {
      setShowApp(true);
      handleSetCurrentUser(userObj);
    })
    .catch(err => alert(err))
  };

  const handleLogout = () => {
    setShowApp(false);
    putCurrentUser({id: 0})

    localStorage.setItem('isUserActive', false)
    localStorage.setItem('currentUser', {id: 0})

    navigate("/");
  };

  return (
    <>
      {showApp ? <NavBar onLogout={handleLogout} /> : <HiddenNavBar />}
      <Router showApp={showApp} onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} />
    </>
  );
}

export default App;
