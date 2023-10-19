const Stats = () => {
  const userURL = "http://localhost:3001/users"

  const handleSaveGame = () => {
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const currentPuzzle = currentUser.activePuzzle.puzzle
   
    if (currentUser.saved.find(item => item.id === currentPuzzle.id)) {
      currentUser.saved = currentUser.saved.filter(item => item.id !== currentPuzzle.id)
    }

    currentUser.saved.unshift(currentPuzzle)

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
    const solution = JSON.parse(localStorage.getItem("currentUser")).activePuzzle.solution
    const answers = JSON.parse(localStorage.getItem("currentUser")).activePuzzle.answers

    if (String(answers) !== String(solution)) {
      const allTds = Array.from(document.querySelectorAll('td'))
      
      for (let i = 0; i <= 80; i++) {
        if (answers[i] !== solution[i]) {
          allTds[i].classList.add('red')
        } else {
          allTds[i].classList.remove('red')
        }
      }

    } else {
      const allTds = Array.from(document.querySelectorAll('td'))
      allTds.forEach(item => item.classList.remove('red'))
      
    }
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats