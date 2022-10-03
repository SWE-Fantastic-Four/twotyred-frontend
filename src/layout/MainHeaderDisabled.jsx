import React from 'react'
import Menu from "../assets/Menu.svg";

const MainHeaderDisabled = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50 cursor-default">
        <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray text-[24px] font-medium">
          <div className="h-full mr-[24px] flex items-center border-dark-gray relative group">
            <div className="rounded-full h-[50px] w-[50px] border" />
          </div>
          <div className="h-full mr-[41px] flex items-center border-dark-gray relative group">
            <p>Create New Route</p>
          </div>
          <div className="h-full mr-[40px] flex items-center border-dark-gray">
            <p>Dashboard</p>
          </div>
        </div>
      </nav>
      {/* Mobile Navbar */}
      <nav className="flex sm:hidden h-[53px] bg-light-gray z-50 shadow-lg top-0 sticky w-full cursor-default py-[18px] px-[16px]">
        {/* <div className="w-full flex justify-center items-center"> */}
          {/* <p className="font-medium text-[20px]">{""}</p> */}
        {/* </div> */}
      </nav>
    </>
  )
}

export default MainHeaderDisabled
