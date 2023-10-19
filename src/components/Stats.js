const Stats = () => {
  const userURL = "http://localhost:3001/users"

  const handleSaveGame = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentPuzzle = currentUser.activePuzzle.puzzle
    const currentAnswers = currentUser.activePuzzle.answers

    //check if currentUser already has this puzzle saved
    if (currentUser.saved.find(item => item.id === currentPuzzle.id)) {
      currentUser.saved = currentUser.saved.filter(item => item.id !== currentPuzzle.id)
    }

    //add saved answers to puzzle
    const savedWithAnswers = {
      ...currentPuzzle,
      savedAnswers: currentAnswers
    }
    //push current puzzle to "saved"
    currentUser.saved.unshift(savedWithAnswers)

    //patch DB with currentUser
    fetch(`${userURL}/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(userData => {
      localStorage.setItem('currentUser', JSON.stringify(userData))
    })
  }

  const checkSolution = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(String(currentUser.activePuzzle.answers) === String(currentUser.activePuzzle.solution))
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats