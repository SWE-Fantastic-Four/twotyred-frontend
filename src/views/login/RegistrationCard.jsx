import React from 'react'
import LoginInput from './LoginInput'
import PrimaryButton from '../../components/PrimaryButton'

const RegistrationCard = ({ links }) => {
  return (
    <div className="m-auto w-[494px] bg-off-white p-[60px] shadow-md rounded-[58px] flex flex-col">
      <p className="mb-[40px] font-extralight text-[32px]">Account Registration</p>
      <div className="flex flex-col gap-[20px] mb-[40px]">
        <LoginInput placeholder="enter email address" />
        <LoginInput placeholder="enter username" />
        <LoginInput placeholder="enter password" />
        <LoginInput placeholder="confirm password" />
      </div>
      <PrimaryButton onClick={links.showRegistrationSuccess}>Register</PrimaryButton>
    </div>
  )
}

export default RegistrationCard
