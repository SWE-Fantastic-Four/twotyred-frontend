import React from "react";

const LoginInput = ({ placeholder, type, onChange, value, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      className="text-[14px] w-full sm:p-[18px] px-[14px] py-[11.5px] bg-[#EFF7F2]"
    />
  );
};

export default LoginInput;
