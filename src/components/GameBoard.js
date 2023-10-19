import GameCell from './GameCell';
import GameInput from './GameInput';

const GameBoard = () => {
  const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const answers = JSON.parse(localStorage.getItem("currentUser")).activePuzzle.answers

  const tableRows = dummyArr.map((item, idx) => {
    return (
      <tr key={idx} id={item}>
        <GameCell cellId={idx === 0 ? item + 0 : (9 * idx) + 0} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 1 : (9 * idx) + 1} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 2 : (9 * idx) + 2} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 3 : (9 * idx) + 3} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 4 : (9 * idx) + 4} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 5 : (9 * idx) + 5} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 6 : (9 * idx) + 6} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 7 : (9 * idx) + 7} answers={answers}/>
        <GameCell cellId={idx === 0 ? item + 8 : (9 * idx) + 8} answers={answers}/>
      </tr>
    )
  })
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