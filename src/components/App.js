import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import HiddenNavBar from "./HiddenNavBar";
import Router from './Router'; 
import { useNavigate } from 'react-router-dom';
import '../index.css';

const currentURL = "http://localhost:3001/currentUser"

function App() {
  const [showApp, setShowApp] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

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
    fetch("http://localhost:3001/users/fakeuser@gmail.com")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText)
      }
    })
    .then(data => {
      setShowApp(true);
      postCurrent(data)
    })
    .catch(err => alert(err))
  };

  const handleLogout = () => {
    navigate("/");
    postCurrent({id: 0});
    setShowApp(false);
  };

  return (
    <>
      {showApp ? <NavBar onLogout={handleLogout} /> : <HiddenNavBar />}
      <Router showApp={showApp} onLoginSuccess={handleLoginSuccess} onContinueAsGuest={handleContinueAsGuest} currentUser={currentUser} updateUser={postCurrent} />
    </>
  );
}

export default App;
