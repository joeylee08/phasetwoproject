import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameBoard from "./GameBoard";
import './YourPuzzles.css';

const YourPuzzles = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [allPuzzles, setAllPuzzles] = useState([]);
    const currentUserURL = "http://localhost:3001/currentUser";
    const allPuzzlesURL = "http://localhost:3001/puzzles";
    const navigate = useNavigate();

    const handlePuzzleClick = (puzzle) => {
        navigate("/", { state: { puzzleData: puzzle } });
    };

    const renderSavedPuzzles = () => {
        if (!currentUser) {
            return <p>Loading...</p>;
        }
    
        const savedPuzzles = currentUser.saved || [];
    
        return (
            <div className="saved-puzzles">
                {currentUser.activePuzzle && (
                    <div className="saved-puzzle" onClick={() => handlePuzzleClick(currentUser.activePuzzle.puzzle)}>
                        <h2>Active Puzzle</h2>
                        <GameBoard currentPuzzle={currentUser.activePuzzle.puzzle} editable={false} />
                    </div>
                )}
                {savedPuzzles.length > 0 ? savedPuzzles.map((puzzle, index) => (
                    <div key={currentUser.id + "-saved-" + index} className="saved-puzzle" onClick={() => handlePuzzleClick(puzzle)}>
                        <h2>Saved Puzzle {index + 1}</h2>
                        <GameBoard currentPuzzle={puzzle} editable={false} />
                    </div>
                )) : <p>No saved puzzles</p>}
            </div>
        );
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(currentUserURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAllPuzzles = async () => {
            try {
                const response = await fetch(allPuzzlesURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch all puzzles');
                }
                const data = await response.json();
                setAllPuzzles(data);
            } catch (error) {
                console.error('Error fetching all puzzles:', error);
            }
        };

        fetchData();
        fetchAllPuzzles();
    }, []); 

    return (
        <div className="your-puzzles-container">
            <h1>Your Puzzles</h1>
            {renderSavedPuzzles()}
        </div>
    );
}

export default YourPuzzles;
