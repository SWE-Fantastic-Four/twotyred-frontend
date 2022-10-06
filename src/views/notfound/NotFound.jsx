import React from 'react'
import MainLayout from '../../layout/MainLayout'
import NotFoundGhost from "../../assets/NotFoundGhost.svg";
import { Link } from 'react-router-dom';
import P from '../../constants/paths';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen flex items-center justify-center gap-[5%]">
        <img src={NotFoundGhost} alt="Ghost" className="w-[35%]" />
        <div className="w-[47.5%] h-[80%] bg-gray rounded-[30px] py-[8vh] px-[3%] flex flex-col items-center justify-between">
          <h1 className="font-secondary font-bold text-[110px] leading-[80px]">Error 404</h1>
          <p className="text-[48px] text-center font-medium">Oops looks like a ghost! The page you are looking for cannot be found.</p>
          <Link to={P.LOGIN} className="py-[2.2vh] px-[7.6%] border-2 bg-white rounded-[12px] text-[24px] font-medium shadow-lg hover:border-4 hover:py-[calc(2.2vh-2px)] hover:px-[calc(7.6%-2px)]">Return Home</Link>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
