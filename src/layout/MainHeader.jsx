// import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Transition, Disclosure } from "@headlessui/react";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CreateSpeechBtmDark from "../assets/CreateSpeechBtmDark.svg";
import CreateSpeechTopDark from "../assets/CreateSpeechTopDark.svg";
import Menu from "../assets/Menu.svg";
import ProfileSpeechBtmDark from "../assets/ProfileSpeechBtmDark.svg";
import ProfileSpeechTopDark from "../assets/ProfileSpeechTopDark.svg";
import P from '../constants/paths';
import { logout } from '../store/auth';
import AvatarIcon from "../components/AvatarIcon";
import AvatarImage from "../assets/AvatarImage.png";

const MainHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = getAuth();
  const username = auth.currentUser.displayName;
  const displayImage = auth.currentUser.photoURL;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pathname = location.pathname;
  let state = null;
  if (pathname === P.CREATEROUTE) {
    state = location.state.mode;
  }

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
      <Transition
        className="top-0 w-[297px] fixed h-screen z-50 bg-white shadow-2xl rounded-r-[20px] pt-[23px] pr-[15px] pb-[27px] pl-[25px] flex flex-col"
        show={showMobileMenu}
        enter="transition-all duration-500 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="-translate-x-0"
        leave="transition-all duration-500 ease-in-out"
        leaveFrom="-translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="relative flex flex-col h-full justify-between">
          <ChevronLeftIcon className="absolute right-0 top-0 text-dark-gray stroke-2 cursor-pointer" height={25} width={25} onClick={() => setShowMobileMenu(false)}/>
          <div>
            <Link to={P.PROFILE} className="flex flex-col items-center max-w-max">
              <AvatarIcon className="mt-[20px]" size="[105.24px]" src={displayImage === null ? AvatarImage : displayImage} />
              <p className="mt-[10px] font-medium text-[18.93px]">@{username}</p>
            </Link>
            <div className="border-t w-[236.36px] mt-[17.5px] py-[16px] font-medium">
              <NavLink to={P.DASHBOARD} className={({isActive}) => (isActive ? "text-black" : "text-dark-gray") + " text-[24px]"}>
                Dashboard
              </NavLink>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button as="div" className={(pathname === P.CREATEROUTE ? "text-black" : "text-dark-gray") + " flex justify-between items-center mt-[25px] text-[24px] leading-[28px] cursor-pointer"}>
                      Create New Route
                      <ChevronDownIcon className={`stroke-2 transition-all duration-300 ${open ? "rotate-180" : ""}`} height={25} width={25}/>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-200 ease-out"
                      enterFrom="-translate-y-4 opacity-50"
                      enterTo="translate-y-0 opacity-100"
                      leave="transition duration-200 ease-out"
                      leaveFrom="translate-y-0 opacity-100"
                      leaveTo="-translate-y-4 opacity-50"
                    >
                      <Disclosure.Panel>
                        <Link to={P.CREATEROUTE} state={{mode: "default"}} className={`block text-[20px] mt-[20px] w-[215px] pl-[8px] py-[5px] ${state === "default" ? "bg-light-gray" : "bg-white"} rounded-[10px]`}>Customise Route</Link>
                        <Link to={P.CREATEROUTE} state={{mode: "lucky"}} className={`block text-[20px] mt-[8px] w-[215px] pl-[8px] py-[5px] ${state === "lucky" ? "bg-light-gray" : "bg-white"} rounded-[10px]`}>I'm Feeling Lucky</Link>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

            </div>
          </div>
          <Link onClick={logoutHandler} to={P.LOGIN} className="text-[22px] font-medium">Logout</Link>
        </div>
      </Transition>
    </>
  )
}

export default MainHeader
