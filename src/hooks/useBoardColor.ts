import { useState, useEffect } from 'react';
import { useAppSelector } from './hooks';
import { allBoardsState } from '../store/slices/allBoardsSlice';

const useBoardColor = (titleID: string | undefined) => {
  const [boardColor, setBoardColor] = useState('');
  const allBoards = useAppSelector(allBoardsState);

  useEffect(() => {
    if (titleID) {
      const currentBoard = allBoards.find((ob) => ob.id === titleID)!;
      setBoardColor(currentBoard?.boardColor);
    }
  }, [titleID]);

  return boardColor;
};

export default useBoardColor;
