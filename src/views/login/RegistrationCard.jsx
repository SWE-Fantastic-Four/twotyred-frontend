import React from 'react'
import LoginInput from './LoginInput'
import PrimaryButton from '../../components/PrimaryButton'

const RegistrationCard = ({ links }) => {
  return (
    <>
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
    </>
  )
}

export default RegistrationCard
