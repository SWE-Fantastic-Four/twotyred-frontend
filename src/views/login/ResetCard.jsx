import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import LoginInput from './LoginInput';

const ResetCard = ({ links }) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("")

  const inputHandler = (e) => {
    setEmail(e.target.value);
  }

  const passwordResetHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await sendPasswordResetEmail(auth, email);
      links.showResetSuccess();
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <p className="mb-[7px] font-extralight text-[32px]">Account Registration</p>
      <p className="mb-[10px] font-extralight text-[20px] text-[#C52424] h-[23px]">{errorMsg}</p>
      <form className="flex flex-col" onSubmit={passwordResetHandler}>
        <div className="flex flex-col gap-[20px] mb-[40px]">
          <LoginInput placeholder="enter email address" type="email" value={email} onChange={inputHandler} />
        </div>
        <div className="flex justify-between">
          <SecondaryButton type="button" onClick={links.showSignIn}>Back</SecondaryButton>
          <PrimaryButton type="submit">Send email</PrimaryButton>
        </div>
      </form>
    </>
  )
}

export default ResetCard
