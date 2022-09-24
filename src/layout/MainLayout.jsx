import React from 'react'
import MainHeader from './MainHeader'
import MainHeaderDisabled from './MainHeaderDisabled';
import { useLocation } from "react-router-dom";
import P from '../constants/paths';

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === P.LOGIN ? <MainHeaderDisabled /> : <MainHeader />}
      <div className="flex flex-col justify-center items-center">
        <div className={`${location.pathname === P.CREATEROUTE ? "": "max-w-[var(--max-screen-width)]"}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
