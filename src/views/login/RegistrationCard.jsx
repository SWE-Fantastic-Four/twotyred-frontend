import React from 'react'
import LoginInput from './LoginInput'
import PrimaryButton from '../../components/PrimaryButton'
import { motion } from 'framer-motion' 

const RegistrationCard = ({ links }) => {
  return (
    <>
      {/* <motion.div initial={{ opacity: 0.5, x: "100%" }} animate={{ opacity: 1, x: "0" }} transition={{ duration: 1 }}> */}
        <div>
          <p className="mb-[40px] font-extralight text-[32px]">Account Registration</p>
          <div className="flex flex-col gap-[20px] mb-[40px]">
            <LoginInput placeholder="enter email address" type="text" />
            <LoginInput placeholder="enter username" type="email" />
            <LoginInput placeholder="enter password" type="password" />
            <LoginInput placeholder="confirm password" type="password" />
          </div>
          <PrimaryButton onClick={links.showRegistrationSuccess}>Register</PrimaryButton>
        </div>
      {/* </motion.div> */}
    </>
  )
}

export default RegistrationCard
