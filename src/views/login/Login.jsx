import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import SignInCard from './SignInCard';
import RegistrationCard from './RegistrationCard';
import ResetCard from './ResetCard';
import RegistrationSuccessCard from './RegistrationSuccessCard';

const loginCards = {
  signIn: "signIn",
  registration: "registration",
  reset: "reset",
  registrationSuccess: "registrationSuccess"
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

  const renderCard = () => {
    switch (card) {
      case loginCards.signIn:
        return <SignInCard links={{ showRegistration, showReset }} />
      
      case loginCards.registration:
        return <RegistrationCard links={{ showRegistrationSuccess }}/>

      case loginCards.reset:
        return <ResetCard />

      case loginCards.registrationSuccess:
        return <RegistrationSuccessCard links={{ showSignIn }}/>

      default:
        break;
    }
  }

  return (
    <main className="relative bg-[url('assets/bike.png'),_url('assets/bike.png')] bg-no-repeat bg-[position:calc(50%-700px)_60px,_calc(50%+750px)_200px]"> 
      <MainLayout>
          <section className="pt-[105px] pb-[105px] min-h-[650px]">
            <div className="m-auto w-[494px] bg-off-white p-[60px] shadow-md rounded-[58px] flex flex-col overflow-hidden">
              {renderCard()}
            </div>
          </section>
      </MainLayout>
    </main>
  )
}
export default Login;
