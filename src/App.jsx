import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import P from './constants/paths'
import CreateRoute from './views/createroute/CreateRoute'
import Dashboard from './views/dashboard/Dashboard'
import Login from './views/login/Login'
import Profile from './views/profile/Profile'
import NotFound from "./views/notfound/NotFound"
import { useEffect } from "react";
import { login, logout } from "./store/auth";

function App() {
  initializeApp({
    "apiKey": "AIzaSyDQo2Q0zwwsmdKmYuxMkC-xrkZfDuO_3hM",
    "authDomain": "swe-backend-20cf0.firebaseapp.com",
    "projectId": "swe-backend-20cf0",
    "storageBucket": "swe-backend-20cf0.appspot.com",
    "messagingSenderId": "814253670096",
    "appId": "1:814253670096:web:81f8f9fabf6e6114bbe8d5",
    "measurementId": "G-PFRT0M5S3H"
  });
  
  const dispatch = useDispatch();
  const auth = getAuth();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });
  },[]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path={P.DASHBOARD} element={<Dashboard />} />
        <Route path={P.LOGIN} element={isLoggedIn ? <Navigate to={P.DASHBOARD} replace /> : <Login />}/>
        <Route path={P.PROFILE} element={<Profile />}/>
        <Route path={P.CREATEROUTE} element={<CreateRoute />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
