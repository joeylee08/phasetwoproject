import * as React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const links = ["Home", "About", "Instructions", "Leader Board", "Your Puzzles", "Sudoku Store"];

const NavBar = () => {
    const mappedLinks = links.map(link => {
        return <Link className="navLink" key={uuid()} to={`/${link === "Home" ? "" : link.toLowerCase().split(" ").join("")}`}>{link}</Link>
    })

    return (
        <header>
            {mappedLinks}
        </header>
    )
}

export default NavBar;