import React from 'react'

const GreenButton = ({ children, className }) => {
  return (
    <button
      className={`flex justify-center font-medium items-center sm:px-[32px] px-[25px] sm:py-[16px] py-[12px] rounded-[4px] bg-[#70C174] sm:text-[20px]  text-[#ffffff] text-[18px] sm:leading-[23px] leading-[21px] box-border hover:border sm:hover:py-[15px] sm:hover:px-[31px] hover:py-[11px] hover:px-[24px] ${className}`}
    >
      {children}
    </button>
  );
}

export default GreenButton
