import PlayField from "./PlayField"

const MainBody = ({ currentUser, setCurrentUser }) => {
    return (
        <>
            <h1>Main Body</h1>
            <PlayField currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </>
    )
}

export default MainBody