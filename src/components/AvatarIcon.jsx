import React from 'react'
import Edit from "../assets/Edit.svg";

const AvatarIcon = ({src, size, borderColour, className, editPhoto}) => {
  return (
    <div className={`justify-center items-center relative ${editPhoto ? "cursor-pointer group" : ""}`} onClick={editPhoto}>
      <img className={`w-${size} h-${size} rounded-full object-cover border border-${borderColour} ${className}`} src={src}/> 
      <div className={`w-[137px] h-[137px] rounded-full bg-white bg-opacity-75 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center absolute bottom-[1px] right-[1px] text-[25px]`}>
        <p className="font-medium text-center leading-[30px]">Edit<br />Photo</p>
      </div>
      {editPhoto && <div className="absolute rounded-full bg-black w-[26px] h-[26px] right-2 bottom-2 flex justify-center items-center">
        <img src={Edit} />
      </div>}
    </div>
  )
}

export default AvatarIcon
