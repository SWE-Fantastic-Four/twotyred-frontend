import { getAuth, signOut } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CreateSpeechBtmDark from "../assets/CreateSpeechBtmDark.svg";
import CreateSpeechTopDark from "../assets/CreateSpeechTopDark.svg";
import ProfileSpeechBtmDark from "../assets/ProfileSpeechBtmDark.svg";
import ProfileSpeechTopDark from "../assets/ProfileSpeechTopDark.svg";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import P from '../constants/paths';
import { logout } from '../store/auth';
import Menu from "../assets/Menu.svg";

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = getAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pathname = location.pathname;
  let mobileNavbarText;
  switch (pathname) {
    case P.CREATEROUTE:
      mobileNavbarText = "Create New Route";
      break;

    case P.DASHBOARD:
      mobileNavbarText = "Dashboard";
      break;

    case P.PROFILE:
      mobileNavbarText = "User Profile";
      break;
  
    default:
      break;
  }

  const logoutHandler = () => {
    try {
      signOut(auth);
      dispatch(logout());
    } catch (error) {
      // TODO: link to 404 page
      console.error(error);
    }
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex w-full justify-center shadow-lg h-[98px] sticky top-0 bg-white z-50">
        <div className="flex flex-row-reverse items-center max-w-[var(--max-screen-width)] w-full text-dark-gray text-[24px] font-medium">
          <div className="hover:border-b-[3px] h-full mr-[24px] flex items-center border-dark-gray relative group">
            <div className={`${pathname === P.PROFILE ? "border-2 border-black" : "border"} rounded-full h-[50px] w-[50px]`} />
            <div className="absolute top-[81px] transition-all opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 w-[218px] h-[171px] right-0 translate-x-[12px] flex flex-col bg-[url('assets/ProfileSpeech.svg')]">
              <div className="h-[64px] w-[202px] mt-[32px] mx-auto">
                <Link to={P.PROFILE} className="h-full w-full hover:text-black cursor-pointer flex items-center justify-center peer">Profile</Link>
                <img src={ProfileSpeechTopDark} className="absolute invisible peer-hover:visible top-[6px] -z-10" />
              </div>
              <div className="h-[64px] w-[202px] mx-auto">
                <Link onClick={logoutHandler} to={P.LOGIN} className="h-full w-full hover:text-black cursor-pointer flex items-center justify-center peer">Logout</Link>
                <img src={ProfileSpeechBtmDark} className="absolute invisible peer-hover:visible top-[98px] -z-10" />
              </div>
            </div>
          </div>
          <div className={`${pathname === P.CREATEROUTE ? "text-black" : ""} hover:border-b-[3px] h-full mr-[41px] flex items-center border-dark-gray relative group`}>
            <p>Create New Route</p>
            <div className="absolute top-[81px] transition-all opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 w-[242px] h-[171px] left-1/2 -translate-x-1/2 flex flex-col bg-[url('assets/CreateSpeech.svg')] ">
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
      {/* Mobile Navbar */}
      <nav className="flex sm:hidden h-[53px] bg-light-gray z-40 shadow-lg top-0 sticky w-full cursor-default py-[18px] px-[16px]">
        <img src={Menu} alt="menu" onClick={() => setShowMobileMenu(!showMobileMenu)} />
        <div className="w-full flex justify-center items-center">
          <p className="font-medium text-[20px]">{mobileNavbarText}</p>
        </div>
      </nav>
      {
        showMobileMenu && <div className="fixed left-0 top-0 h-screen w-[calc(100vw-23px)] z-50 rounded-r-[20px] shadow-2xl bg-white pt-[23px] pr-[15px] pb-[27px] pl-[25px] flex flex-col">
          <ChevronLeftIcon className="self-end text-dark-gray" height={25} width={25} />
        </div>
      }
    </>
  )
}

export default MainHeader
