import React from "react";
import LoginInput from "./LoginInput";
import PrimaryButton from "../../components/PrimaryButton";
import TertiaryButton from "../../components/TertiaryButton";
import { motion, AnimatePresence } from "framer-motion";

const SignInCard = ({ links }) => {
  return (
    <>
      <p className="mb-[40px] font-extralight text-[32px]">Sign In</p>
      <div className="flex flex-col gap-[20px]">
        <LoginInput placeholder="enter email address" type="email" />
        <LoginInput placeholder="enter password" type="password" />
      </div>
      <TertiaryButton className="self-end mb-[14px]" onClick={links.showReset}>forgot password</TertiaryButton>
      <div className="flex justify-between items-center">
        <PrimaryButton>Sign In</PrimaryButton>
        <TertiaryButton onClick={links.showRegistration}>create account</TertiaryButton>
      </div>
      {/* <motion.div initial={{ opacity: 0.5, x: "100%" }} exit={{ opacity: 0.5, x: "100%" }} animate={{ opacity: 1, x: "0" }} transition={{ duration: 1 }}> */}
      {/* </motion.div> */}
    </>
  );
};

export default SignInCard;
