import { Outlet } from 'react-router-dom'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1'

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
        <div style={{display: 'flex', width: '100vw'}}>
          <Sidebar />
          <div style={{width: '100%'}}> 
            <Outlet />
          </div>
        </div>
    </main>
  )
}

export default Layout