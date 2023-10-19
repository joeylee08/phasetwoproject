import {useEffect} from 'react'

const GameInput = ({ handleInput, idCount, inputValue, handleSetInputValue}) => {
    const answers = JSON.parse(localStorage.getItem('currentUser')).activePuzzle.answers;
        
    useEffect(() => {
      if (answers[idCount] === 0) {
        handleSetInputValue(5)
      }
    }, [answers])
    
    return (
        <>
            <input className="sudoku-input" onInput={handleInput} value={inputValue}/>
        </>
    )
}

export default GameInput;