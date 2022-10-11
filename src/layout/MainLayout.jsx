import React from 'react';
import { useLocation } from "react-router-dom";
import P from '../constants/paths';
import MainHeader from './MainHeader';
import MainHeaderDisabled from './MainHeaderDisabled';

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="w-full">
      {location.pathname === P.LOGIN ? <MainHeaderDisabled /> : <MainHeader />}
      <div className="flex flex-col justify-center items-center w-full">
        <div className={`${location.pathname === P.PROFILE || location.pathname === P.CREATEROUTE ? "w-full" : "max-w-[var(--max-screen-width)]"}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
