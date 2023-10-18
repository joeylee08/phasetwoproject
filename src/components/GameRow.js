import GameCell from "./GameCell";
import { v4 as uuid } from "uuid";

const GameRow = ({ iCount, answersArr, handleInput}) => {

    const mappedCells = answersArr.map((cellData, idx) => {
        const idCount = (iCount * 9) + idx
        return <GameCell key={uuid()} handleInput={handleInput} idCount={idCount} cellData={Number(cellData)} />
    })

    return (
        <tr>{mappedCells}</tr>
    )

}

export default GameRow;