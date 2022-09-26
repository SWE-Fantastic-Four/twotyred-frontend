import React from "react";

const TertiaryButton = ({ children, className, onClick, type }) => {
  return (
    <button
      className={`mt-[8px] w-max text-[15px] hover:underline ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
