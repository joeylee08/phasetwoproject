import React from 'react'

const SideBar = () => {
  const userInfo = JSON.parse(localStorage.getItem("currentUser"))
  
  return (
    <div id="sidebar" className='playfield-elements'>
      <h3>Game Data</h3>
      <ul>
        <li><span className='bold-text'>User: </span>{userInfo.username}</li>
        <li><span className='bold-text'>Points: </span>{userInfo.points}</li>
        <li><span className='bold-text'>Puzzle ID: </span>{userInfo.activePuzzle.puzzle.id}</li>
        <li><span className='bold-text'>Difficulty: </span>{userInfo.activePuzzle.puzzle.difficulty}</li>
      </ul>
    </div>
  )
}

export default SideBar