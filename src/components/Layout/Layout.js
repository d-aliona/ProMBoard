import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

const Layout = () => {
  return (
    <main style={{ 
        width: '100%',
        height: '100vh',
        backgroundColor: '#f4f5f7' 
    }}>
        <Topbar />
        <Sidebar />
        <Outlet />
    </main>
  )
}

export default Layout