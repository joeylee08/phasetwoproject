import GameRow from './GameRow';
import { v4 as uuid } from "uuid";

const GameBoard = ({ answers, handleInput }) => {

  const displayPuzzle = (answers) => {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      let answersArr = answers.slice((i * 9), ((i + 1) * 9))
      arr.push(<GameRow key={uuid()} iCount={i} answersArr={answersArr} handleInput={handleInput} />)
    }
    return arr;
  }

  const tableRows = displayPuzzle(answers);
  
  return (
    <div id="gameboard" className='playfield-elements'>
      <div>
        <table id="sudoku-table">
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default GameBoard