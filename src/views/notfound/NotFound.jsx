import React from 'react'
import MainLayout from '../../layout/MainLayout'
import NotFoundGhost from "../../assets/NotFoundGhost.svg";
import { Link } from 'react-router-dom';
import P from '../../constants/paths';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen flex sm:flex-row flex-col items-center justify-center gap-[5%]">
        <img src={NotFoundGhost} alt="Ghost" className="xl:w-[450px] lg:w-[350px] sm:w-[250px] w-[183px]" />
        <div className="xl:w-[608px] xl:h-[492px] lg:w-[500px] lg:h-[404px] md:w-[400px] md:h-[350px] sm:w-[350px] sm:h-[323px] w-[263px] h-[213px] bg-gray rounded-[30px] xl:py-[56px] md:py-[32px] sm:py-[20px] sm:px-[28px] pt-[24px] pb-[17px] px-[12px] flex flex-col items-center justify-between">
          <h1 className="font-secondary font-bold xl:text-[110px] md:text-[90px] sm:text-[70px] text-[47px] sm:leading-[80px] leading-[35px]">Error 404</h1>
          <p className="xl:text-[48px] lg:text-[36px] sm:text-[26px] text-[20px] text-center font-medium leading-[24px] sm:leading-normal">Oops looks like a ghost! The page you are looking for cannot be found.</p>
          <Link to={P.LOGIN} className="sm:py-[16px] sm:px-[45px] py-[10.5px] px-[30px] border-2 bg-white rounded-[12px] sm:text-[24px] text-[16px] font-medium shadow-lg hover:border-4 hover:py-[calc(2.2vh-2px)] hover:px-[calc(7.6%-2px)]">Return Home</Link>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
