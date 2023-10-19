import React from 'react'

const SideBar = () => {
  const userInfo = JSON.parse(localStorage.getItem("currentUser"))
  
  return (
    <div id="sidebar" className='playfield-elements'>
      <h3>Game Data</h3>
      <ul id='sidebar-list'>
        <li>User: {userInfo.username}</li>
        <li>Points: {userInfo.points}</li>
        <li>Puzzle ID: {userInfo.activePuzzle.puzzle.id}</li>
        <li>Difficulty: {userInfo.activePuzzle.puzzle.difficulty}</li>
      </ul>
    </div>
  )
}

export default SideBar