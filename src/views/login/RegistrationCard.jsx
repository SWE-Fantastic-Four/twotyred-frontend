import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import React, { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import LoginInput from './LoginInput';
import { urls } from "../../constants/constants";

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

      const response = await fetch(urls.backend + "/users/create", {
        method: "POST",
        body: JSON.stringify({
          username,
          routes: [],
          favourites: [],
          likes: [],
          totalTime: 0,
          totalDistance: 0,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      await updateProfile(user, {
        displayName: username,
        photoUrl: ""
      });

      links.showRegistrationSuccess();
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <div>
        <p className="sm:mb-[7px] mb-[2px] font-extralight sm:text-[32px] text-[26px]">Account Registration</p>
        <p className="sm:mb-[10px] font-extralight sm:text-[20px] text-[15px] text-[#C52424] sm:h-[23px] h-[18px] sm:leading-[23px] leading-[18px]">{errorMsg}</p>
        <form className="flex flex-col" onSubmit={registerHandler}>
          <div className="flex flex-col sm:gap-[20px] gap-[15px] sm:mb-[40px] mb-[30px]">
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
