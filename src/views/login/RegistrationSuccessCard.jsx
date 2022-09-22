import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'

const ResetSuccessCard = ({ links }) => {
  return (
    <>
      <p className="mb-[40px] font-extralight text-[32px]">You've signed up successfully!</p>
      <PrimaryButton onClick={links.showSignIn}>Return to login</PrimaryButton>
    </>
  )
}

export default ResetSuccessCard
