import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Start from './pages/Start';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Boards from './pages/Boards';
import Members from './pages/Members';
import Profile from './pages/Profile';
import Board from './pages/Board';
import OpenCard from './pages/OpenCard';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import GetState from './hoc/GetState/GetState';
import GetBoardState from './hoc/GetBoardState';
import RequireAuth from './hoc/RequireAuth';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route
        path="auth/*"
        element={
          <GetState>
            <RequireAuth>
              <Routes>
                <Route path="" element={<Layout />}>
                  <Route path="home" element={<Home />} />
                  <Route exact path="profile" element={<Profile />} />
                  <Route path="boards" element={<Boards />} />
                  <Route path="members" element={<Members />} />
                  <Route
                    path="board/:id/*"
                    element={
                      <GetBoardState>
                        <Routes>
                          <Route path="" element={<Board />} />
                          <Route path=":idcard" element={<OpenCard />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </GetBoardState>
                    }
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="board/*/*" element={<NotFound />} />
              </Routes>
            </RequireAuth>
          </GetState>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
