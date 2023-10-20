import { useNavigate, useParams } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate()
  const param = useParams()

  const ms = param.param === "photo" ? 2800 : 600
  setTimeout(() => navigate("/"), ms)

  return (
    <>
      {param.param === "photo" ? <img id="goldstar" src="/goldstar2.jpg" alt="goldstar" /> : <h1 id="loadingText">Loading puzzle...</h1>}
      {/* <img src="./goldstar.jpeg" alt="goldstar" id="goldstar" className={showStar ? null : 'hidden'}/> */}
    </>
  )
}

export default Loading