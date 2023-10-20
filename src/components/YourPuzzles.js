import React, { useEffect, useState } from 'react';
import GameBoard from "./GameBoard";
import './YourPuzzles.css';
import { useNavigate } from 'react-router-dom';

const YourPuzzles = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load currentUser from local storage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        // Save currentUser to local storage whenever it changes
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const handleDeleteClick = async (puzzleIndex) => {
        const updatedSavedPuzzles = currentUser.saved.filter((_, index) => index !== puzzleIndex);
        
        setCurrentUser(prevUser => ({
            ...prevUser,
            saved: updatedSavedPuzzles
        }));
    };

    const handlePuzzleClick = (puzzle) => {
        navigate("/", { state: { puzzleData: puzzle } });
    };

    const renderSavedPuzzles = () => {
        if (!currentUser) return <p>Loading...</p>;

        return (
            <div className="saved-puzzles">
                {currentUser.saved.map((puzzle, index) => (
                    <div key={index} className="saved-puzzle">
                        <h2>Saved Puzzle {index + 1}</h2>
                        <GameBoard currentPuzzle={puzzle} editable={false} />
                        <button onClick={() => handleDeleteClick(index)}>Delete Puzzle</button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="your-puzzles-container">
            <h1>Your Puzzles</h1>
            {renderSavedPuzzles()}
        </div>
    );
}

export default YourPuzzles;
