import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import LoginInput from './LoginInput';

const RegistrationCard = ({ links }) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputHandler = (e) => {
    setErrorMsg("");
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;

      case "username":
        setUsername(e.target.value);
        break;
      
      case "password":
        setPassword(e.target.value);
        break;

      case "cfmPassword":
        setCfmPassword(e.target.value);
        break;

      default:
        break;
    }
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== cfmPassword) {
        throw new Error("Passwords do not match.");
      }
      await createUserWithEmailAndPassword(auth, email, password);
      links.showRegistrationSuccess();
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <div>
        <p className="mb-[7px] font-extralight text-[32px]">Account Registration</p>
        <p className="mb-[10px] font-extralight text-[20px] text-[#C52424] h-[23px]">{errorMsg}</p>
        <form className="flex flex-col" onSubmit={registerHandler}>
          <div className="flex flex-col gap-[20px] mb-[40px]">
            <LoginInput placeholder="enter email address" type="email" onChange={inputHandler} value={email} name="email" />
            <LoginInput placeholder="enter username" type="text" onChange={inputHandler} value={username} name="username" />
            <LoginInput placeholder="enter password" type="password" onChange={inputHandler} value={password} name="password" />
            <LoginInput placeholder="confirm password" type="password" onChange={inputHandler} value={cfmPassword} name="cfmPassword" />
          </div>
          <div className="flex justify-between">
            <SecondaryButton type="button" onClick={links.showSignIn}>Back</SecondaryButton>
            <PrimaryButton type="submit">Register</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegistrationCard
