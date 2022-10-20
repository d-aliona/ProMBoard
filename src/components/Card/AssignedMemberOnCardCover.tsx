import React, { useState } from 'react';

import Initials from '../../ui/Initials';
import style from '../../assets/scss/card.module.scss';

interface AssignMemProps {
    currentMember: User;
}

const AssignedMemberOnCardCover: React.FC<AssignMemProps> = ({ currentMember }) => {
  const [coordY, setCoordY] = useState(0);
  const [showHint, setShowHint] = useState(false)

  return (
    < >
        <div
            className={style.assignedMember}
            onMouseOver={(e) => {
                e.stopPropagation();
                setShowHint(true)
                setCoordY(e.clientY + 20);
            }}
            onMouseOut={(e) => {
                e.stopPropagation(); 
                setShowHint(false)}
            }
        >
            <Initials
            user={currentMember}
            size={'28px'}
            font={'14px'}
            />
        </div>
        {showHint && (
            <div className={style.hint} style={{top: coordY}}>
            {currentMember.firstName +
            ' ' +
            currentMember.lastName}
            </div>
        )}
    </>
  );
};

export default AssignedMemberOnCardCover;
