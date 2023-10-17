const Stats = ({currentUser, answers}) => {
  const handleSaveGame = () => {
    //make answers back to 2d array ?

    //update localStorage > currentUser > 

    //update localStorage currentUser[key] with currentUser[state]

    //patch DB with currentUser id, to include updated answers
    const twoDimAnswersArr = answers
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats