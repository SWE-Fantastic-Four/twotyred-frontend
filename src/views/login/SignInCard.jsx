import React from "react";
import LoginInput from "./LoginInput";
import PrimaryButton from "../../components/PrimaryButton";
import TertiaryButton from "../../components/TertiaryButton";

const SignInCard = ({ links }) => {
  return (
    <div className="m-auto w-[494px] bg-off-white p-[60px] shadow-md rounded-[58px] flex flex-col">
      <p className="mb-[40px] font-extralight text-[32px]">Sign In</p>
      <div className="flex flex-col gap-[20px]">
        <LoginInput placeholder="enter email address" />
        <LoginInput placeholder="enter password" />
      </div>
      <TertiaryButton className="self-end mb-[14px]" onClick={links.showReset}>forgot password</TertiaryButton>
      <div className="flex justify-between items-center">
        <PrimaryButton>Sign In</PrimaryButton>
        <TertiaryButton onClick={links.showRegistration}>create account</TertiaryButton>
      </div>
    </div>
  );
};

export default SignInCard;
