import * as React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const links = ["Home", "About", "Instructions", "Leader Board", "Your Puzzles", "Sudoku Store"];

const NavBar = () => {

    const mappedLinks = links.map(link => {
        return (    
            <NavLink
                to={`/${link === "Home" ? "" : link.toLowerCase().split(" ").join("-")}`}
                key={uuid()}
                className={"navLink"}
            >
                {link}
            </NavLink>
        )
    })

    return (
        <header>
            <nav>
                {mappedLinks}
            </nav>
        </header>
    )
}

export default NavBar;