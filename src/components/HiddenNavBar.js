import * as React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const links = ["Home"];

const HiddenNavBar = () => {
    
    const mappedLinks = links.map(link => {
        return (    
            <NavLink
                to={`/`}
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

export default HiddenNavBar;