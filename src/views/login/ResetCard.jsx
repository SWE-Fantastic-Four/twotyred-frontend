import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import LoginInput from './LoginInput';

/* 
  ResetCard.jsx implements the Password Reset boundary class.
  The attributes implemented are:
  1. email

  The key public methods are:
  1. submitEmail() as passwordResetHandler(), which submits the user-inputted email for password reset
  2. displaySuccessMessage() as links.showResetSuccess() to indicate to the user that the email has been successfully sent
  3. displayErrorMessage() as setErrorMsg(), which displays the password reset error message for the user's reference

  @author chayhuixiang
*/

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
      <p className="sm:mb-[7px] mb-[2px] font-extralight mb:text-[32px] text-[26px]">Reset Password</p>
      <p className="sm:mb-[10px] font-extralight sm:text-[20px] text-[15px] text-[#C52424] sm:h-[23px] h-[21px]">{errorMsg}</p>
      <form className="flex flex-col" onSubmit={passwordResetHandler}>
        <div className="flex flex-col sm:gap-[20px] gap-[15px] sm:mb-[40px] mb-[30px]">
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
