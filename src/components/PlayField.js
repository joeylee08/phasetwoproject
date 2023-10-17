import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const URL = "http://localhost:3001/puzzles/";

const PlayField = ({ currentUser, updateUser }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState({});
  const [currentAnswers, setCurrentAnswers] = useState([]);

  // console.log("user", currentUser.puzzles.saved[0].grid)

  const savedPuzzle = (currentUser.puzzles && currentUser.puzzles.saved[0] && currentUser.puzzles.saved[0].grid) ? currentUser.puzzles.saved[0].grid : null;
  const savedId = (currentUser.puzzles && currentUser.puzzles.saved[0] && currentUser.puzzles.saved[0].id) ? currentUser.puzzles.saved[0].id : null;

  const updateAnswers = (e) => {
    const tdArray = Array.from(document.querySelectorAll("td")).map(item => {
      if (Array.from(item.children)[0]) {
        return Number(Array.from(item.children)[0].value) || 0
      } else {
        return Number(item.textContent);
      }
    });
    if (Number(e.target.value)) {
      let arr = [...tdArray];
      arr[Number(e.target.id)] = Number(e.target.value);
      setCurrentAnswers(arr);
    } else {
      e.target.value = "";
    }
  }

  const urlId = savedId || Math.floor(Math.random() * 250) + 1
  
  const displayPuzzle = (puzzle, answers) => {
    const tdArray = Array.from(document.querySelectorAll("td"));

    setCurrentPuzzle(puzzle)
    setCurrentAnswers(answers)

    console.log("puzzle: ", puzzle)
    console.log("answers: ", answers)

    tdArray.forEach((item, idx) => {
      if (answers[idx]) {
        item.textContent = answers[idx]
      } else {
        const input = document.createElement("input");
        input.id = idx
        input.value = "";
        input.classList.add("sudoku-input");
        input.addEventListener('input', updateAnswers)
        item.textContent = "";
        item.append(input)
      }
    })
  }

  useEffect(() => {
    fetch(`${URL}${urlId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      if (savedPuzzle) {
        displayPuzzle(data, savedPuzzle)
      } else{
        displayPuzzle(data, data.newboard.grids[0].value.flat())
      }
    })
    .catch(err => alert(err));
  }, [currentUser.id])

  const saveGame = () => {
    const user = {...currentUser}
    const puzzleToBeSaved = {
      grid: currentAnswers,
      id: currentPuzzle.id
    }

    const newList = user.puzzles.saved.filter(puzzle => {
      return puzzle.id !== currentPuzzle.id
    })

    user.puzzles.saved = [
      puzzleToBeSaved,
      ...newList
    ]

    console.log("user current puzzles", currentAnswers);

    updateUser(user);

  }

  
  return (
    <div id="playfield">
      <SideBar currentPuzzle={currentPuzzle} />
      <Stats currentPuzzle={currentPuzzle} saveGame={saveGame} />
      <GameBoard currentPuzzle={currentPuzzle} />
    </div>
  )
}

export default PlayField