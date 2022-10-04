import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { MenuProvider } from '../../context/MenuContext';

const Layout = () => {
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
        <div style={{ display: 'flex', width: '100vw' }}>
          <Sidebar />
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <Outlet />
          </div>
        </div>
      </MenuProvider>
    </main>
  );
};

export default Layout;
