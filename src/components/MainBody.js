import PlayField from "./PlayField"

const MainBody = ({ currentUser, currentPuzzle }) => {
    return (
        <>
            <h1>Main Body</h1>
            <PlayField currentUser={currentUser} currentPuzzle={currentPuzzle} />
        </>
    )
}

export default MainBody