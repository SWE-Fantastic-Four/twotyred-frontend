import React from 'react'


const AvatarImage = ({src, size, borderWidth, borderColour}) => {
    return (
        <div className="justify-center items-center">
            <img className={`w-${size} h-${size} rounded-full object-cover border-${borderWidth} border-${borderColour}`} src={src}/> 
        </div>
    )
}

export default AvatarImage
