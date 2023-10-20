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

  const allCells = document.querySelectorAll('td')
  
  allCells.forEach((cell)=> {
    if (cell.id % 9 === 2 || cell.id % 9 === 5) {
      cell.classList.add('border-right')
    }
    if (cell.id >= 27 && cell.id <= 35) {
      cell.classList.add('border-top')
    }
    if (cell.id >= 54 && cell.id <= 62) {
      cell.classList.add('border-top')
    }
  })

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

  const handleSetCurrentUser = (userObj, newPuzz = false, toReset = false) => {
    // console.log(userObj)
    const randomPuzzle = allPuzzles[Math.floor(Math.random() * 99) + 1]

    if (newPuzz) {
      userObj.activePuzzle.puzzle = randomPuzzle
      userObj.activePuzzle.answers = userObj.activePuzzle.puzzle.start
    } else if (toReset) {
      userObj.activePuzzle.answers = userObj.activePuzzle.puzzle.start
    } else {
      userObj.activePuzzle.puzzle = userObj.saved[0] || randomPuzzle
      userObj.activePuzzle.answers = userObj.activePuzzle.answers.length === 0 ? userObj.activePuzzle.puzzle.start : userObj.activePuzzle.answers
    }

    userObj.activePuzzle.solution = userObj.activePuzzle.puzzle.solution

    localStorage.setItem('isUserActive', true)
    localStorage.setItem('currentUser', JSON.stringify(userObj))
    localStorage.setItem('clickCount', '1')

    putCurrentUser(userObj)
    navigate("/loading/loadMsg")
  }

  const handleLoginSuccess = (userObj) => {
    handleSetCurrentUser(userObj)
    setShowApp(true);
  };

  const handleContinueAsGuest = () => {
    fetch("http://localhost:3001/users/guestuser@gmail.com")
    .then(response => {
      if (response.ok) return response.json();
      else throw (response.statusText)
    })
    .then(userObj => {
      handleSetCurrentUser(userObj);
      setShowApp(true);
    })
    .catch(err => alert(err))
  };

  const handleLogout = () => {
    putCurrentUser({id: 0})
    setShowApp(false);

    localStorage.setItem('isUserActive', false)
    localStorage.setItem('currentUser', {id: 0})

    navigate("/");
  };

  return (
    <>
      {showApp ? <NavBar onLogout={handleLogout} /> : <HiddenNavBar />}
      <Router showApp={showApp} onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} allPuzzles={allPuzzles} putCurrentUser={putCurrentUser} handleSetCurrentUser={handleSetCurrentUser}/>
    </>
  );
}

export default App;
