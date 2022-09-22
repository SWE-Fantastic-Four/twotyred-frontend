import React from "react";

const LoginInput = ({ placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-[14px] w-full p-[18px] bg-[#EFF7F2]"
    />
  );
};

export default LoginInput;
