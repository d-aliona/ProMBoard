import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { allBoardsState } from '../store/slices/allBoardsSlice'

const useBoardColor = (title) => {
    
    const [boardColor, setBoardColor] = useState('') 
    const allBoards = useSelector(allBoardsState)
    
    useEffect(() => {
        if (title.id) {
            const currentBoard = allBoards.find(ob => ob.id === title.id)
            setBoardColor(currentBoard.boardColor)
        }
    },[title])
    
    return boardColor
  }

  export default useBoardColor