import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import RegistrationCard from './RegistrationCard';
import RegistrationSuccessCard from './RegistrationSuccessCard';
import ResetCard from './ResetCard';
import ResetSuccessCard from './ResetSuccessCard';
import SignInCard from './SignInCard';

const loginCards = {
  signIn: "signIn",
  registration: "registration",
  reset: "reset",
  registrationSuccess: "registrationSuccess",
  resetSuccess: "resetSuccess"
}

const Login = () => {
  const [card, setCard] = useState(loginCards.signIn);
  
  const showSignIn = () => {
    setCard(loginCards.signIn);
  }
  const showRegistration = () => {
    setCard(loginCards.registration);
  }

  const showReset = () => {
    setCard(loginCards.reset);
  }

  const showRegistrationSuccess = () => {
    setCard(loginCards.registrationSuccess);
  }

  const showResetSuccess = () => {
    setCard(loginCards.resetSuccess);
  }

  const renderCard = () => {
    switch (card) {
      case loginCards.signIn:
        return <SignInCard links={{ showRegistration, showReset }} />
      
      case loginCards.registration:
        return <RegistrationCard links={{ showRegistrationSuccess, showSignIn }} />

      case loginCards.reset:
        return <ResetCard links={{ showSignIn, showResetSuccess }} />

      case loginCards.registrationSuccess:
        return <RegistrationSuccessCard links={{ showSignIn }} />

      case loginCards.resetSuccess:
        return <ResetSuccessCard links={{ showSignIn }} />

      default:
        break;
    }
  }

  return (
    <main className="relative bg-[url('assets/bike.png'),_url('assets/bike.png')] bg-no-repeat sm:bg-[position:calc(50%-700px)_60px,_calc(50%+750px)_200px] bg-[position:calc(50%-150px)_30px,_calc(50%+150px)_300px] bg-[length:300px] sm:bg-[length:auto] self-center"> 
      <MainLayout>
          <section className="pt-[105px] pb-[105px] sm:min-h-[650px]">
            <div className="m-auto sm:w-[494px] w-[296px] bg-off-white sm:p-[60px] py-[30px] px-[24px] shadow-md sm:rounded-[58px] rounded-[39.35px] flex flex-col overflow-hidden">
              {renderCard()}
            </div>
          </section>
      </MainLayout>
    </main>
  )
}
export default Login;
