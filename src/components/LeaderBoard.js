import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const usersURL = "http://localhost:3001/users";

const LeaderBoard = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch(usersURL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(data => setAllUsers(data))
            .catch(err => alert(err));
    }, []);

    const mappedUsers = allUsers.sort((a, b) => b.points - a.points).map((user, idx) => (
        <div key={uuid()} style={styles.userContainer}>
            <span style={styles.rank}>{idx + 1}</span>
            <span style={styles.username}>{user.username || "N/A"}</span> 
            <div style={styles.pointsContainer}>
                <div style={{...styles.pointsBar, width: `${(user.points / 1000) * 100}%`}}></div>
            </div>
            <span style={styles.points}>{user.points}</span>
        </div>
    ));
    

    return (
      <>
        <br></br>
        <div style={styles.leaderBoard}>
            <h1 style={styles.title}>Leader Board</h1>
            <div style={styles.headers}>
                <span style={styles.rankHeader}>Rank</span>
                <span style={styles.usernameHeader}>Username</span>
                <span style={styles.pointsHeader}>Points</span>
            </div>
            {mappedUsers}
        </div>
      </>
    );
};

const styles = {
    leaderBoard: {
        fontFamily: '"Arial", sans-serif',
        textAlign: 'center',
        width: '80%',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
    },
    title: {
        marginBottom: '20px',
        color: '#725e89',
    },
    headers: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontWeight: 'bold',
        padding: '0 10px',
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '2px solid #e0d7ec',
    },
    rank: {
        width: '50px',
        textAlign: 'center',
        marginRight: '10px',
    },
    username: {
        flex: 2,
        textAlign: 'left',
        paddingRight: '10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginLeft: '20px',
    },
    pointsContainer: {
        flex: 8, 
        backgroundColor: '#e0d7ec',
        borderRadius: '5px',
        height: '20px',
        marginRight: '10px',
    },
    pointsBar: {
        height: '100%',
        backgroundColor: '#b8a9c9',
        borderRadius: '5px',
    },
    points: {
        flex: 1, 
        textAlign: 'right',
    },
    rankHeader: {
        width: '50px',
        textAlign: 'right',
        marginRight: '10px',
    },
    usernameHeader: {
        flex: 2,
        textAlign: 'left',
        paddingRight: '10px',
        marginLeft: '20px',
    },

    pointsHeader: {
        flex: 1,
        textAlign: 'right',
    },
};


export default LeaderBoard;