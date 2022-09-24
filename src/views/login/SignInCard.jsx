import React from "react";
import LoginInput from "./LoginInput";
import PrimaryButton from "../../components/PrimaryButton";
import TertiaryButton from "../../components/TertiaryButton";
import { login } from "../../store/auth";
import { useDispatch } from "react-redux";

const SignInCard = ({ links }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p className="mb-[40px] font-extralight text-[32px]">Sign In</p>
      <div className="flex flex-col gap-[20px]">
        <LoginInput placeholder="enter email address" type="email" />
        <LoginInput placeholder="enter password" type="password" />
      </div>
      <TertiaryButton className="self-end mb-[14px]" onClick={links.showReset}>forgot password</TertiaryButton>
      <div className="flex justify-between items-center">
        <PrimaryButton onClick={() => dispatch(login())}>Sign In</PrimaryButton>
        <TertiaryButton onClick={links.showRegistration}>create account</TertiaryButton>
      </div>
    </>
  );
};

export default SignInCard;
