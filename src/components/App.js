import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import HiddenNavBar from "./HiddenNavBar";
import Router from './Router'; 
import '../index.css';

const currentURL = "http://localhost:3001/currentUser"

function App() {
  const [showApp, setShowApp] = useState(false);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    fetch(currentURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText)
      }
    })
    .then(data => {
      if (data.id) {
        setCurrentUser(data)
        setShowApp(true)
      }
    })
    .catch(err => alert(err))
  }, []);

  const postCurrent = (userData) => {
    fetch(currentURL, {
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
    .then(data => {
      setCurrentUser(data)
    })
    .catch(err => alert(err))
  }

  const handleLoginSuccess = (data) => {
    setShowApp(true);
    postCurrent(data)
  };

  const handleContinueAsGuest = () => {
  };

  const handleLogout = () => {
    postCurrent({id: 0});
    setShowApp(false);
  };

  return (
    <>
      {showApp ? <NavBar onLogout={handleLogout} /> : <HiddenNavBar />}
      <Router showApp={showApp} onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} currentUser={currentUser} />
    </>
  );
}

export default App;
