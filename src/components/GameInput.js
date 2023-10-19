import {useState} from 'react'

const GameInput = ({ cellId, answers }) => {
    const initialValue = answers[cellId] ? answers[cellId] : ""
    const [inputValue, setInputValue] = useState(initialValue)

    const numReg = /[1-9]/;

    const handleInput = (e) => {
        if (!e.target.value.match(numReg) || e.target.value === "") {
          setInputValue("")
        } else if (+e.target.value > 9) {
          setInputValue(+e.target.value.slice(0, 1))
        } else {
          setInputValue(e.target.value)
        }

        let updated = [...JSON.parse(localStorage.getItem("currentUser")).activePuzzle.answers].map((item, idx) => {
            if (+e.target.parentElement.id === idx) return +e.target.value
            else return item;
        })
        
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("currentUser"))
        }
        
        updatedUser.activePuzzle.answers = updated
    
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      }

    return (
        <>
            <input className="sudoku-input" onInput={handleInput} value={inputValue}/>
        </>
    )
}

export default GameInput;