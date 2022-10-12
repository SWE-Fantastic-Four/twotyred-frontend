import React from 'react'
import Edit from "../assets/Edit.svg";

const AvatarIcon = ({ src, className, editPhoto, imgClassName }) => {
  return (
    <div className={`justify-center items-center relative ${editPhoto ? "cursor-pointer group" : ""} ${className}`} onClick={editPhoto}>
      <img className={`rounded-full object-cover border w-full h-full ${imgClassName}`} src={src}/> 
      {editPhoto && <>
        <div className={`sm:w-[137px] sm:h-[137px] w-[94px] h-[94px] rounded-full bg-white bg-opacity-75 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center absolute bottom-[1px] right-[1px] text-[25px]`}>
          <p className="font-medium text-center leading-[30px]">Edit<br />Photo</p>
        </div>
        <div className="absolute rounded-full bg-black w-[26px] h-[26px] sm:right-2 sm:bottom-2 right-1 bottom-1 flex justify-center items-center">
          <img src={Edit} />
        </div>
      </>
      }
    </div>
  )
}

export default AvatarIcon
