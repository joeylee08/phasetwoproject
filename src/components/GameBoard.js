import React, { useState, useEffect } from 'react'

const URL = "http://localhost:3001/puzzles/1";

const GameBoard = () => {
  const [puzzle, setPuzzle] = useState({});
  
  const displayPuzzle = (puzzleObj) => {
    const tdArray = Array.from(document.querySelectorAll("td"));
    const newObj = {
      id: puzzleObj.id,
      puzzle: puzzleObj.newboard.grids[0].value.flat(),
      solution: puzzleObj.newboard.grids[0].solution.flat(),
      difficulty: puzzleObj.newboard.grids[0].difficulty
    }
    setPuzzle(newObj);
    tdArray.forEach((item, idx) => {
      if (newObj.puzzle[idx]) {
        item.textContent = newObj.puzzle[idx]
      } else {
        const input = document.createElement("input")
        input.value = "";
        input.classList.add("sudoku-input")
        item.textContent = "";
        item.append(input)
      }
      // newObj.puzzle[idx] ? item.textContent = newObj.puzzle[idx] :
      //   (item.innerHTML = "",
      //   item.append());
    })
  }

  useEffect(() => {
    fetch(URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      displayPuzzle(data)
    })
    .catch(err => alert(err));
  }, [])

  return (
    <div id="gameboard">
      <div>
        <table id="sudoku-table">
          <tbody>
          <tr id="0">
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top right'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top right'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top right'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top right'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
            <td className='top'>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td className="right">0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default GameBoard