import GameCell from "./GameCell";
import { v4 as uuid } from "uuid";

const GameRow = ({ iCount, answersArr, handleInput, inputValue, handleSetInputValue}) => {

    const mappedCells = answersArr.map((cellData, idx) => {
        const idCount = (iCount * 9) + idx
        return <GameCell key={uuid()} handleInput={handleInput} inputValue={inputValue} handleSetInputValue={handleSetInputValue} idCount={idCount} cellData={Number(cellData)} idx={idx} />
    })

    return (
        <tr>{mappedCells}</tr>
    )

}

export default GameRow;