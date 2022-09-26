import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import TertiaryButton from "../../components/TertiaryButton";
import { login } from "../../store/auth";
import LoginInput from "./LoginInput";

const SignInCard = ({ links }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
    
      default:
        break;
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <p className="mb-[7px] font-extralight text-[32px]">Sign In</p>
      <p className="mb-[10px] font-extralight text-[20px] text-[#C52424] h-[23px]">{errorMsg}</p>
      <form className="flex flex-col" onSubmit={loginHandler}>
        <div className="flex flex-col gap-[20px]">
          <LoginInput placeholder="enter email address" type="email" name="email" onChange={inputHandler} value={email} />
          <LoginInput placeholder="enter password" type="password" name="password" onChange={inputHandler} value={password} />
        </div>
        <TertiaryButton type="button" className="self-end mb-[14px]" onClick={links.showReset}>forgot password</TertiaryButton>
        <div className="flex justify-between items-center">
          <PrimaryButton type="submit">Sign In</PrimaryButton>
          <TertiaryButton type="button" onClick={links.showRegistration}>create account</TertiaryButton>
        </div>
      </form>
    </>
  );
};

export default SignInCard;
