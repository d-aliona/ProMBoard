import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Start from './pages/Start'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Board from './pages/Board'
import Card1 from './pages/Card1'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import GetState from './hoc/GetState/GetState' 
import GetBoardState from './hoc/GetBoardState'
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
        <Route path="auth/*" element={
            <GetState>
              <RequireAuth>
                <Routes>
                  <Route path='' element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route exact path="profile" element={<Profile />} />
                    <Route path='board/:id/*' element={
                      <GetBoardState>
                        <Routes>
                          <Route path='' element={<Board />} />
                          <Route path=':idcard' element={<Card1 />} />
                        </Routes>
                      </GetBoardState> 
                    } />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RequireAuth>
            </GetState>
        } />
        <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  )  
}

export default App
