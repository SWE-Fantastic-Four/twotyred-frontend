import React from "react";

const PrimaryButton = ({ children, className, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-max px-[10px] py-[6px] bg-light-green text-[20px] leading-[23px] box-border hover:border hover:py-[5px] hover:px-[9px] ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
