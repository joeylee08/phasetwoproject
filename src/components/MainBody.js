import PlayField from "./PlayField"

const MainBody = ({ currentUser, setCurrentUser, postCurrentUser }) => {
    return (
        <>
            <h1>Main Body</h1>
            <PlayField currentUser={currentUser} setCurrentUser={setCurrentUser} postCurrentUser={postCurrentUser} />
        </>
    )
}

export default MainBody