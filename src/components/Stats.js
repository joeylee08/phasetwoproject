import {useNavigate} from 'react-router-dom'

const Stats = ({handleSetCurrentUser}) => {
  const userURL = "http://localhost:3001/users"
  const navigate = useNavigate()

  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  let currentPuzzle = currentUser.activePuzzle.puzzle

  const handleSaveGame = () => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"))
    currentPuzzle = currentUser.activePuzzle.puzzle

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

  const reset = (currentUser, newPuzz, toReset) => {
    handleSetCurrentUser(currentUser, newPuzz, toReset)
  }
  
  const getNewPuzzle = (userObj = currentUser, newPuzz, toReset) => {
    const allTds = Array.from(document.querySelectorAll('td'))
    allTds.forEach(item => item.classList.remove('red'))
    handleSetCurrentUser(userObj, newPuzz, toReset)
  }

  const checkSolution = () => {
    // navigate("/loading/photo")
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

      currentPuzzle = currentUser.activePuzzle.puzzle

      const clicks = +localStorage.getItem('clickCount')
      const difficulty = currentPuzzle = currentUser.activePuzzle.puzzle.difficulty
      const multiplier = difficulty === "Hard" ? 1.5 : difficulty === "Medium" ? 1.0 : 0.8

      const score = Math.floor((2000 / clicks) * multiplier)
      const currentPoints = JSON.parse(localStorage.getItem('currentUser')).points

      const updatedUserScore = {
        ...currentUser
      }

      updatedUserScore.points = currentPoints + score

      fetch(`${userURL}/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUserScore)
      })
      .then(res => res.json())
      .then(updatedUser => {
        setTimeout(() => getNewPuzzle(updatedUser, true, false), 2500)
      })
      .catch(err => alert('Failed to updated score.'))

      navigate("/loading/photo")
    }
  }

  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      <button id="reset" onClick={() => reset(currentUser, false, true)}>Reset</button>
      <button id="newPuzzle" onClick={() => getNewPuzzle(currentUser, true, false)}>New Puzzle</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats