import React, { useState } from 'react';

import MemberOnCard from './MemberOnCard';
import AssignMemberForm from '../../features/AssignMemberForm';
import style from '../../assets/scss/card.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

const CardMembers: React.FC<CardProps> = ({ card }) => {
  const size = useWindowSize();
  const [clickAddMembers, setClickAddMembers] = useState(false);

  return (
    <>
      <div className={style.boundaries}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
          <div className={style.displayMembersicon}></div>
          <div style={{ fontSize: '18px' }}>Members</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            margin: size.width > 770 ? '10px 0 0 45px' : '10px 0 0 10px',
          }}
        >
          {card.assignedUsers &&
            card.assignedUsers.map((memberID) => {
              return (
                <MemberOnCard key={memberID} card={card} memberID={memberID} />
              );
            })}
          <div
            className={style.assignMember}
            onClick={(e) => {
              setClickAddMembers(true);
              e.stopPropagation();
            }}
          >
            +
          </div>
        </div>
        {clickAddMembers && (
          <AssignMemberForm
            card={card}
            setClickAddMembers={setClickAddMembers}
          />
        )}
      </div>
    </>
  );
};

export default CardMembers;
