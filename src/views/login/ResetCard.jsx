import React from 'react'
import LoginInput from './LoginInput'
import PrimaryButton from '../../components/PrimaryButton'

const ResetCard = () => {
  return (
    <>
      <p className="mb-[40px] font-extralight text-[32px]">Account Registration</p>
      <div className="flex flex-col gap-[20px] mb-[40px]">
        <LoginInput placeholder="enter email address" type="email" />
      </div>
      <PrimaryButton>Send email</PrimaryButton>
    </>
  )
}

export default ResetCard
