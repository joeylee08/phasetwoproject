import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const usersURL = " http://localhost:3001/users";

const LeaderBoard = () => {
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        fetch(usersURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw (response.statusText)
            }
        })
        .then(data => setAllUsers(data))
        .catch(err => alert(err))
    }, [])

    const mappedUsers = allUsers.sort((a, b) => {
        return b.points - a.points;
    }).map((user, idx) => {
        return <li key={uuid()}><span>{idx + 1}) {user.username}:</span> <span>{user.points}</span></li>
    })

    return (
        <>
            <h1>Leader Board</h1>
            <section id="leaders">
                <article>
                    <ul>
                        {mappedUsers}
                    </ul>
                </article>
            </section>
        </>
    )
}

export default LeaderBoard;