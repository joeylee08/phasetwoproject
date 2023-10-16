import * as React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const NavBar = ({ onLogout }) => {
  const links = ["Home", "About", "Instructions", "Leader Board", "Your Puzzles", "Sudoku Store"];

  const mappedLinks = links.map(link => (
    <NavLink
      to={`/${link === "Home" ? "" : link.toLowerCase().split(" ").join("-")}`}
      key={uuid()}
      className={"navLink"}
    >
      {link}
    </NavLink>
  ));

  return (
    <header>
      <nav>
        {mappedLinks}
        <button onClick={onLogout} style={{ marginLeft: 'auto' }}>Logout</button>
      </nav>
    </header>
  );
};

export default NavBar;
