import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import useWindowSize from '../../hooks/useWindowSize';
import { MenuProvider } from '../../context/MenuContext';

const Layout = () => {
  const size = useWindowSize();

  return (
    <main
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#f4f5f7',
      }}
    >
      <MenuProvider>
        <Topbar />
        <div
          style={{
            display: 'flex',
            width: '100vw',
            height: 'calc(100vh - 44px)',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: size.width < 799 ? '20px' : '' }}>
            <Sidebar />
          </div>
          <div style={{ width: '100%' }}>
            <Outlet />
          </div>
        </div>
      </MenuProvider>
    </main>
  );
};

export default Layout;
