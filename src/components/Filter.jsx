import React, { useState, useRef, useEffect } from "react";
import { BarsArrowDownIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Filter({ routeOption, setRouteOption }) {
  const [isClicked, setisClicked] = useState(false);
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  function click() {
    setisClicked(function (oldValue) {
      return !oldValue;
    });
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
        setisClicked(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[ref]);

  return (
    <>
      <div
        data-dropdown-toggle="dropdown"
        className={`initalbox flex items-center h-[38px] w-[195px] border-[3px] border-solid border-black stroke-solid rounded-xl justify-between relative hover:cursor-pointer
             ${isClicked ? `bg-[#D9D9D9]` : `bg-white`}
             `}
        onClick={click}
        ref={ref}
      >
        <h2 className="description font-[Roboto] text-[19px] font-medium leading-[22px] ml-[20px]">
          {routeOption === 0 ? "Most Liked" : "Most Recent"}
        </h2>
        <BarsArrowDownIcon
          className={`mr-[20px] stroke-current self-auto w-[24px] h-[24px]`}
        />
      </div>
      <div className="entiredropdown absolute z-10 mt-[10px] shadow-md" ref={dropdownRef}>
        {
            isClicked && ( 
            <div className="dropdown h-[72px] w-[195px] border-black border-[3px] rounded-xl overflow-hidden bg-white">
            <div className="option1 h-[33px] flex justify-between bg-white  hover:bg-[#EFEFEF] hover:cursor-pointer items-center" onClick={()=> {setRouteOption(0); setisClicked(false);}}>
                <p className="font-[Roboto] text-[19px] font-medium leading-[22px] pl-[20px]">Most Liked</p>
                {routeOption === 0 && <div className="Icon">
                    <CheckIcon className="w-[23px] stroke-current mr-[19px] pb-[7px] pt-[3px]" /> 
                </div>}
            </div>
            <div className="option2 h-[33px] bg-white  hover:bg-[#EFEFEF] flex cursor-pointer items-center justify-between" onClick={()=> {setRouteOption(1); setisClicked(false);}}>
                <p className="option2 font-[Roboto] text-[19px] font-medium leading-[22px] pl-[20px] flex items-center">Most Recent</p>
                {routeOption === 1 && 
                    <CheckIcon className="w-[23px] stroke-current mr-[19px] pb-[7px] pt-[3px]" /> 
                }
            </div>
        </div>)
        }
      </div>
    </>
  )
}


