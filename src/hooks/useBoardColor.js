import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { personalBoardsState } from '../store/slices/personalBoardsSlice'
import { notPersonalBoardsState } from '../store/slices/notPersonalBoardsSlice'

const useBoardColor = (title) => {
    
    const [boardColor, setBoardColor] = useState('') 
    const boards = useSelector(personalBoardsState)
    const notUserBoards = useSelector(notPersonalBoardsState)
    const user = useSelector((state) => state.user.user)
    
    useEffect(() => {
        if (title.id) {
            const currentBoard = boards.find(ob => ob.id === title.id) || notUserBoards.find(ob => ob.id === title.id)
            setBoardColor(currentBoard.boardColor)
        }
    },[title])
    
    return boardColor
  }

  export default useBoardColor