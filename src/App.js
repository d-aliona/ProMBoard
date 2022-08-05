import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Start from './pages/Start'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Board from './pages/Board'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import GetState from './hoc/GetState/GetState' 
import RequireAuth from './hoc/RequireAuth'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Layout />}> */}
        <Route path='/' element={<Start />} />
        <Route path='signup' element={<Signup/>} />
        <Route path='login' element={<Login/>} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="auth/*"
          element={
            <GetState>
              <RequireAuth>
                <Routes>
                  <Route path='' element={<Layout />}>
                    <Route exact path="home" element={<Home />} />
                    <Route exact path="profile" element={<Profile />} />
                    <Route path='board/:id' element={<Board />} />
                  </Route>
                  
                  {/* <Route exact path="member-list" element={<MemberList />} />
                  <Route exact path="member-management" element={<MemberManagement />} />
                  <Route exact path="manager-management" element={<ManagerManagement />} />
                  <Route exact path="event-list" element={<EventList />} />
                  <Route exact path="event-management" element={<EventManagement />} />
                  <Route exact path="event-management/event" element={<Event />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RequireAuth>
            </GetState>
          }
        />
        <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  )  
}

export default App
