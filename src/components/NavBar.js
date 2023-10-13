import * as React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const links = ["Link-1", "Link-2", "Link-3", "Link-4"];

const NavBar = () => {
    const mappedLinks = links.map(link => {
        return <Link className="navLink" key={uuid()} to={link[0]}>{link}</Link>
    })

    return (
    <header>
        {mappedLinks}
    </header>
    )
}

export default NavBar