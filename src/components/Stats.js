import {useNavigate} from 'react-router-dom'

const Stats = ({handleSetCurrentUser}) => {
  const userURL = "http://localhost:3001/users"
  const navigate = useNavigate()

  let currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleSaveGame = () => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"))
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
    console.log(currentUser)
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
      navigate("/loading/photo")
    }
  }

  const reset = (newPuzz, toReset) => {
    handleSetCurrentUser(currentUser, newPuzz, toReset)
  }
  
  const getNewPuzzle = (newPuzz, toReset) => {
    const allTds = Array.from(document.querySelectorAll('td'))
    allTds.forEach(item => item.classList.remove('red'))

    handleSetCurrentUser(currentUser, newPuzz, toReset)
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      <button id="reset" onClick={() => reset(false, true)}>Reset</button>
      <button id="newPuzzle" onClick={() => getNewPuzzle(true, false)}>New Puzzle</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats