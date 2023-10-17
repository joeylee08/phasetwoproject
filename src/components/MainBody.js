import PlayField from "./PlayField"

const MainBody = ({ currentUser, updateUser }) => {
    return (
        <>
            <h1>Main Body</h1>
            <PlayField currentUser={currentUser} />
        </>
    )
}

export default MainBody