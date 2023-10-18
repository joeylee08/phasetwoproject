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
  const [currentUser, setCurrentUser] = useState({});
  const [allPuzzles, setAllPuzzles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isUserActive') === 'true') {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
      setShowApp(true)
    }
    fetch(allPuzzlesURL)
      .then(res => res.json())
      .then(puzzles => {
        setAllPuzzles(puzzles)
      })
  }, [])

  const postCurrentUser = (userData) => {
    fetch(currentUserURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText)
      }
    })
    .catch(err => alert(err))
  }

  const handleSetCurrentUser = (data) => {
    const randomPuzzle = allPuzzles[Math.floor(Math.random() * 250) + 1]

    data.activePuzzle.puzzle = data.saved[0] || randomPuzzle
    data.activePuzzle.answers = data.activePuzzle.puzzle.newboard.grids[0].value
    data.activePuzzle.solution = data.activePuzzle.puzzle.newboard.grids[0].solution
    
    localStorage.setItem('isUserActive', true)
    localStorage.setItem('currentUser', JSON.stringify(data))

    setCurrentUser(data)
    postCurrentUser(data) 
  }

  const updateCurrentUser = (obj) => {
    setCurrentUser(obj)
  }

  const handleLoginSuccess = (data) => {
    setShowApp(true);
    handleSetCurrentUser(data)
  };

  const handleContinueAsGuest = () => {
    fetch("http://localhost:3001/users/guestuser@gmail.com")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText)
      }
    })
    .then(data => {
      setShowApp(true);
      handleSetCurrentUser(data);
    })
    .catch(err => alert(err))
  };

  const handleLogout = () => {
    postCurrentUser({id: 0});
    setShowApp(false);
    postCurrentUser({id: 0});
    localStorage.setItem('isUserActive', false)
    localStorage.setItem('currentUser', {})
    navigate("/");
  };

  return (
    <>
      {showApp ? <NavBar onLogout={handleLogout} /> : <HiddenNavBar />}
      <Router showApp={showApp} onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} currentUser={currentUser} setCurrentUser={updateCurrentUser}/>
    </>
  );
}

export default App;
