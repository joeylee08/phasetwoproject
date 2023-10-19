import {useState} from 'react'

const GameInput = ({ cellId, answers }) => {
    const initialValue = answers[cellId] ? answers[cellId] : ""
    const [inputValue, setInputValue] = useState(initialValue)

    const numReg = /[1-9]/;

    const handleInput = (e) => {
        console.log(typeof e.target.value)
        if (!e.target.value.match(numReg) || e.target.value === "" || isNaN(e.target.value)) {
          setInputValue("")
        } else if (+e.target.value.length > 1) {
          setInputValue(+e.target.value.slice(1))
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
        // console.log(JSON.parse(localStorage.getItem('currentUser')).activePuzzle.answers)
        // console.log(JSON.parse(localStorage.getItem("currentUser")))
      }

    return (
        <>
            <input className="sudoku-input" onInput={handleInput} value={inputValue}/>
        </>
    )
}

export default GameInput;