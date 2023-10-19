import {useState} from 'react'

const Stats = () => {
  const userURL = "http://localhost:3001/users"
  const [showStar, setShowStar] = useState(false)

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
      setShowStar(true)
      setTimeout(() => setShowStar(false), 3000)
    }
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      {/* <button id="reset" onClick={reset}>Reset</button>
      <button id="newPuzzle" onClick={getNewPuzzle}>New Puzzle</button> */}
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
      <img src="./goldstar2.jpg" alt="goldstar" id="goldstar" className={showStar ? null : 'hidden'}/>
      {/* <img src="./goldstar.jpeg" alt="goldstar" id="goldstar" className={showStar ? null : 'hidden'}/> */}
    </div>
  )
}

export default Stats