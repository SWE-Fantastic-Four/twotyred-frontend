import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import P from './constants/paths'
import Dashboard from './views/dashboard/Dashboard'
import Login from './views/login/Login'
import Profile from './views/profile/Profile'
import CreateRoute from './views/createroute/CreateRoute'
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={P.DASHBOARD} element={<Dashboard />} />
        <Route path={P.LOGIN} element={isLoggedIn ? <Navigate to={P.DASHBOARD} replace/> : <Login />}/>
        <Route path={P.PROFILE} element={<Profile />}/>
        <Route path={P.CREATEROUTE} element={<CreateRoute />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
