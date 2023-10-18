const GameInput = ({ handleInput }) => {
    return (
        <>
            <input className="sudoku-input" onChange={handleInput} />
        </>
    )
}

export default GameInput;