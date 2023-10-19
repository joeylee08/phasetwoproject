import {useEffect} from 'react'

const GameInput = ({ handleInput, idCount, inputValue, handleSetInputValue}) => {

    return (
        <>
            <input className="sudoku-input" onInput={handleInput} value={inputValue}/>
        </>
    )
}

export default GameInput;