import React from 'react'
import PrimaryButton from '../../components/PrimaryButton'

const RegistrationSuccessCard = ({ links }) => {
  return (
    <>
      <p className="sm:mb-[40px] mb-[30px] font-extralight sm:text-[32px] text-[26px]">You've signed up successfully!</p>
      <PrimaryButton onClick={links.showSignIn}>Return to login</PrimaryButton>
    </>
  )
}

export default RegistrationSuccessCard
