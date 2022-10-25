import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { MenuProvider } from '../../context/MenuContext';
import style from '../../assets/scss/layout.module.scss';

const Layout: React.FC = () => {
  const [toggleClick, setToggleClick] = useState(true);
  const styles: {} = {
    '--width': `${toggleClick ? '200px' : '20px'}`
  }
  
  return (
    <main className={style.container}>
      <MenuProvider>
        <Topbar />
        <div className={style.sidebarPlusOutlet}>
          <div className={style.sidebar} style={styles}>
            <Sidebar
              toggleClick={toggleClick}
              setToggleClick={setToggleClick}
            />
          </div>
          <div className={style.outlet}>
            <Outlet />
          </div>
        </div>
      </MenuProvider>
    </main>
  );
};

export default Layout;
