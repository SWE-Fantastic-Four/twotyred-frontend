import React from 'react';

const GreenButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex justify-center font-medium items-center sm:h-[55px] sm:w-[203px] h-[46.4px] w-[175px] rounded-[4px] bg-[#70C174] sm:text-[20px]  text-[#ffffff] text-[18px] sm:leading-[23px] leading-[21px] box-border hover:border sm:hover:py-[15px] sm:hover:px-[31px] hover:py-[11px] hover:px-[24px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default GreenButton
