import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import P from '../constants/paths'
import CreateSpeechTopDark from "../assets/CreateSpeechTopDark.svg";
import CreateSpeechBtmDark from "../assets/CreateSpeechBtmDark.svg";
import ProfileSpeechTopDark from "../assets/ProfileSpeechTopDark.svg";
import ProfileSpeechBtmDark from "../assets/ProfileSpeechBtmDark.svg";
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <nav className="flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50">
      <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray text-[24px] font-medium">
        <div className="hover:border-b-[3px] h-full mr-[24px] flex items-center border-dark-gray relative group">
          <div className={`${pathname === P.PROFILE ? "border-2 border-black" : "border"} rounded-full h-[50px] w-[50px]`} />
          <div className="absolute top-[81px] invisible group-hover:visible w-[218px] h-[171px] right-0 translate-x-[12px] flex flex-col bg-[url('assets/ProfileSpeech.svg')]">
            <div className="h-[64px] w-[202px] mt-[32px] mx-auto">
              <Link to={P.PROFILE} className="h-full w-full hover:text-black cursor-pointer flex items-center justify-center peer">Profile</Link>
              <img src={ProfileSpeechTopDark} className="absolute invisible peer-hover:visible top-[6px] -z-10" />
            </div>
            <div className="h-[64px] w-[202px] mx-auto">
              <Link onClick={() => dispatch(logout())} to={P.LOGIN} className="h-full w-full hover:text-black cursor-pointer flex items-center justify-center peer">Logout</Link>
              <img src={ProfileSpeechBtmDark} className="absolute invisible peer-hover:visible top-[98px] -z-10" />
            </div>
          </div>
        </div>
        <div className={`${pathname === P.CREATEROUTE ? "text-black" : ""} hover:border-b-[3px] h-full mr-[41px] flex items-center border-dark-gray relative group`}>
          <p>Create New Route</p>
          <div className="absolute top-[81px] invisible group-hover:visible w-[242px] h-[171px] left-1/2 -translate-x-1/2 flex flex-col bg-[url('assets/CreateSpeech.svg')] ">
            <div className="h-[64px] w-[226px] mt-[32px] mx-auto" >
              <NavLink to={P.CREATEROUTE} state={{mode: "default"}} className="h-full w-full hover:text-black cursor-pointer flex items-center justify-center peer">Customise Route</NavLink>
              <img src={CreateSpeechTopDark} className="absolute left-1/2 -translate-x-1/2 invisible peer-hover:visible top-[6px] -z-10" />
            </div>
            <div className="h-[64px] w-[226px] mx-auto">
              <NavLink to={P.CREATEROUTE} state={{mode: "lucky"}} className="h-full w-full flex items-center justify-center peer hover:text-black cursor-pointer">I'm Feeling Lucky</NavLink>
              <img src={CreateSpeechBtmDark} className="absolute left-1/2 -translate-x-1/2 invisible peer-hover:visible top-[98px] -z-10" />
            </div>
          </div>
        </div>
        <NavLink to={P.DASHBOARD} className={({ isActive }) => (isActive ? "text-black" : "hover:border-b-[3px]") + " h-full mr-[40px] flex items-center border-dark-gray" }>
          <p>Dashboard</p>
        </NavLink>
      </div>
    </nav>
  )
}

export default MainHeader
