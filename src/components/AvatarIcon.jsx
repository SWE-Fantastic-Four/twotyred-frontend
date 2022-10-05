import React from 'react'


const AvatarImage=({src, size, borderWidth, borderColour, className}) => {
  return (
    <div className="justify-center items-center">
      <img className={`w-${size} h-${size} rounded-full object-cover border-${borderWidth} border-${borderColour} ${className}`} src={src}/> 
    </div>
  )
}

export default AvatarImage
