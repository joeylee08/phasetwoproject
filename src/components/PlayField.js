import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = () => {
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats />
      <GameBoard />
    </div>
  )
}

export default PlayField