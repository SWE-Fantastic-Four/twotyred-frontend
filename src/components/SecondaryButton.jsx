import React from 'react'

const SecondaryButton = ({ children, className, onClick }) => {
  return (
    <button className={`w-max px-[9px] py-[5px] border-light-gray hover:border-black text-[20px] leading-[23px] box-border ${className}`}>{children}</button>
  )
}

export default SecondaryButton
