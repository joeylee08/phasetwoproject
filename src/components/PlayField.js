import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = ({handleSetCurrentUser}) => {
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats handleSetCurrentUser={handleSetCurrentUser}/>
      <GameBoard />
    </div>
  )
}

export default PlayField