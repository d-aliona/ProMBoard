import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import useWindowSize from '../../hooks/useWindowSize';
import { MenuProvider } from '../../context/MenuContext';
import style from '../../assets/scss/layout.module.scss';

const Layout = () => {
  const size = useWindowSize();

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
