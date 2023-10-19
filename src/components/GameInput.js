import React, { useState } from 'react';

const GameInput = ({ cellId, answers }) => {
    const initialValue = answers[cellId] ? answers[cellId] : "";
    const [inputValue, setInputValue] = useState(initialValue);

    const handleInput = (e) => {
        const newValue = e.target.value;

        // Check if the value is a single digit number between 1 and 9
        if (/^[1-9]$/.test(newValue) || newValue === "") {
            setInputValue(newValue);

            const updatedUser = {
                ...JSON.parse(localStorage.getItem("currentUser")),
            };

            updatedUser.activePuzzle.answers[cellId] = newValue ? parseInt(newValue) : null;
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        } else {
            setInputValue(""); // Reset the input value if it's invalid
        }
    };

    return (
        <input
            className="sudoku-input"
            onInput={handleInput}
            value={inputValue}
            maxLength="1" // Limit the input length to 1
        />
    );
};

export default GameInput;
