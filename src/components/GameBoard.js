import React, { useState, useEffect } from 'react'

const GameBoard = ({ currentPuzzle }) => {
  const solution = currentPuzzle.solution;
  
  return (
    <div id="gameboard" className='playfield-elements'>
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