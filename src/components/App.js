import { useState } from "react";
import NavBar from "./NavBar";
import HiddenNavBar from "./HiddenNavBar";
import Router from "./Router";
import '../index.css';

function App() {
  const [showApp, setShowApp] = useState(true);
  return (
    <>
      {showApp ? <NavBar /> : <HiddenNavBar />}
      <Router showApp={showApp} />
    </>
  );
}

export default App;
