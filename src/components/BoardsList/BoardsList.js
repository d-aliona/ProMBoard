import { useSelector } from 'react-redux'

import { personalBoardsState } from '../../store/slices/personalBoardsSlice'
import style from '../../assets/scss/boardsList.module.scss'

const BoardsList = () => {
    const boards = useSelector(personalBoardsState)
    console.log(boards)
    return (
        <div className={style.list}>
            Boards
            {boards && boards.map((board, id) => <ul><li key={id} >{board.title}</li></ul>)}
        </div>
    )
}

export default BoardsList