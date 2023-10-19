import PlayField from "./PlayField"

const MainBody = ({handleSetCurrentUser}) => {
    return (
        <>
          <div><h1 id="mainTitle">Flatiron Sudoku Challenge</h1></div>
          <PlayField handleSetCurrentUser={handleSetCurrentUser} />
        </>
    )
}

export default MainBody