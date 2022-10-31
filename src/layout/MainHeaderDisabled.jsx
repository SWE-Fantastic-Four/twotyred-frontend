import React from 'react'
import useProfilePhoto from '../hooks/useProfilePhoto'

const MainHeaderDisabled = () => {
  const profilePhoto = useProfilePhoto();
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50 cursor-default">
        <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray text-[24px] font-medium">
          <div className="h-full mr-[24px] flex items-center border-dark-gray relative group">
            <img className="border rounded-full h-[50px] w-[50px]" src={profilePhoto} />
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
      </nav>
    </>
  )
}

export default MainHeaderDisabled
