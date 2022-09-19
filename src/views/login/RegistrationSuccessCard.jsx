import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'

const ResetSuccessCard = ({ links }) => {
  return (
    <div className="m-auto w-[494px] bg-off-white p-[60px] shadow-md rounded-[58px] flex flex-col">
      <p className="mb-[40px] font-extralight text-[32px]">You've signed up successfully!</p>
      <PrimaryButton onClick={links.showSignIn}>Return to login</PrimaryButton>
    </div>
  )
}

export default ResetSuccessCard
