

const Stats = ({ saveGame }) => {

  const handleSaveGame = () => {
    saveGame();
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats