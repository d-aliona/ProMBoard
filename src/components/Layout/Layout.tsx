import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { MenuProvider } from '../../context/MenuContext';
import style from '../../assets/scss/layout.module.scss';

const Layout: React.FC = () => {
  
  return (
    <main className={style.container}>
      <MenuProvider>
        <Topbar />
        <div className={style.sidebarPlusOutlet}>
          <div className={style.sidebar}>
            <Sidebar />
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
