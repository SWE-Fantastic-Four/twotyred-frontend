import React from "react";

const SecondaryButton = ({ children, className, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-max px-[9px] py-[5px] border bg-white border-gray hover:border-black text-[20px] leading-[23px] box-border ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
