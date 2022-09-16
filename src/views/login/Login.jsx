import React from 'react'
import MainLayout from '../../layout/MainLayout';
import bike from "../../assets/bike.png";
import LoginInput from '../../components/LoginInput';

const Login = () => {
  return (
    <MainLayout>
      <main className="w-[var(--max-screen-width)]">
        <img src={bike} className="absolute -left-96 top-12"/>
        <img src={bike} className="absolute bottom-0 -right-96"/>
        <div className="m-auto w-[494px] bg-off-white p-[60px] shadow-md rounded-[58px] font-extralight text-[32px] mt-[105px] flex flex-col">
          <p className="mb-[40px]" >Sign In</p>
          <div className='flex flex-col gap-[20px]'>
            <LoginInput placeholder="enter email address" />
            <LoginInput placeholder="enter password" />
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
export default Login;
