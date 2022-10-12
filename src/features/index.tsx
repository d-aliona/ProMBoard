import React, { useState } from 'react';

// import CreateBoardForm from './CreateBoardForm';
// import style from '../../assets/scss/home.module.scss';

const Home = () => {
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false);

  return (
    <div>
      fff
      <p>hhh</p>
    </div>
    // <div className={style.wrapper}>
    //   <p className={style.motto}>Stay on track and up to date!</p>
    //   <p style={{ fontSize: '20px' }}>Boards are where work gets done</p>
    //   <hr className={style.line} />
    //   <div
    //     className={style.createBoard}
    //     onClick={(e) => {
    //       setShowCreateBoardForm((prev) => !prev);
    //       e.stopPropagation();
    //     }}
    //   >
    //     Create your board
    //   </div>
    //   {showCreateBoardForm && (
    //     <div>
    //       <CreateBoardForm setShowCreateBoardForm={setShowCreateBoardForm} />
    //     </div>
    //   )}
    // </div>
  );
};

export default Home;