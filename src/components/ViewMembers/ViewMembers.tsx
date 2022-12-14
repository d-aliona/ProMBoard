import React, { useState } from 'react';

import ViewMembersPopup from './ViewMembersPopup';
import style from '../../assets/scss/board.module.scss';

interface ViewMembersProps {
  currentBoard: Board;
}

const ViewMembers: React.FC<ViewMembersProps> = ({ currentBoard }) => {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <>
      <div
        className={style.headMenu}
        style={{ cursor: 'pointer', position: 'relative' }}
        onClick={(e) => {
          setShowMembers((prev) => !prev);
          e.stopPropagation();
        }}
      >
        View members
      </div>
      {showMembers && (
        <ViewMembersPopup
          currentBoard={currentBoard}
          setShowMembers={setShowMembers}
        />
      )}
    </>
  );
};

export default ViewMembers;
