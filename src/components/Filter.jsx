import React, { useState } from "react";
import { BarsArrowDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { current } from "@reduxjs/toolkit";

export default function Filter() {
  const [isClicked, setisClicked] = useState(false);
  function click() {
    setisClicked(function (oldValue) {
      console.log(oldValue);
      return !oldValue;
    });
  }

  const [currentView, setCurrentView] = useState("Most Liked");
  // function changeView(){
  //     setCurrentView(function(oldValue){
  //         return(oldValue=="Most Liked"?"Most Recent":"Most Liked")
  //     })
  // }

  return (
    <>
      <div
        data-dropdown-toggle="dropdown"
        className={`initalbox flex h-[38px] w-[195px] border-[3px] border-solid border-black stroke-solid rounded-xl justify-between relative hover:cursor-pointer
             ${isClicked ? `bg-[#D9D9D9]` : `bg-white`}
             `}
        onClick={click}
      >
        <h2 className="description font-[Roboto] text-[19px] font-medium leading-[22px] pl-[20px] pt-[6px] pb-[8px] ">
          {currentView}
        </h2>
        <BarsArrowDownIcon
          className={`pr-[20px] mt-[6px] mb-[6px] stroke-current self-auto`}
        />
      </div>
      <div className="entiredropdown absolute z-10 mt-[10px] shadow-md">
        {
            isClicked && ( 
            <div className="dropdown h-[72px] w-[195px] border-black stroke-solid border-[3px] rounded-xl overflow-hidden bg-white">
            <div className="option1 flex justify-between bg-white  hover:bg-[#EFEFEF] hover:cursor-pointer" onClick={()=>setCurrentView("Most Liked")}>
                <p className="font-[Roboto] text-[19px] font-medium leading-[22px] pl-[20px] pt-[5px] pb-[8px]">Most Liked</p>
                {currentView === "Most Liked" && <div className="Icon">
                    <CheckIcon className="w-[23px] stroke-current mr-[19px] pb-[7px] pt-[3px]" /> 
                </div>}
            </div>
            <div className="option2 h-[35px] bg-white  hover:bg-[#EFEFEF] flex cursor-pointer items-center justify-between" onClick={()=>setCurrentView("Most Recent")}>
                <p className="option2 font-[Roboto] text-[19px] font-medium leading-[22px] pl-[20px] ">Most Recent</p>
                {currentView == "Most Recent" && 
                    <CheckIcon className="w-[23px] stroke-current mr-[19px] pb-[7px] pt-[3px]" /> 
                }
            </div>
        </div>)
        }
      </div>
    </>
  )
}
