import React from 'react'
import { useState } from 'react'

const ProfileBody = ({ className }) => {
  const [showFavourites, setShowFavourites] = useState(false);

  return (
    <div className={`w-screen flex flex-col items-center ${className} font-medium sm:text-[15px] text-[11.1px]`}>
      <div className="sm:w-[284px] w-[210px] border-b flex">
        <div className="w-1/2 flex justify-center items-center">
          <div className={`border-b-[3px] ${showFavourites ? "border-transparent" : ""} flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`} onClick={() => setShowFavourites(false)}>
            <div className="mr-[3px]">Past Routes</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px] pt-[1px]">3</div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className={`border-b-[3px] ${!showFavourites ? "border-transparent" : ""} flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`} onClick={() => setShowFavourites(true)}>
            <div className="mr-[3px]">Favourites</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px] pt-[1px]">0</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBody
