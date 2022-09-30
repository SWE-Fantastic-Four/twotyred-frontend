import React from 'react'
import location from "../../assets/location.svg";
import green from "../../assets/green.svg";
import search from "../../assets/search.svg";
import cross from "../../assets/cross.svg";

const SmallBox = ({ children, className }) => {
  return (
    <button
      className={`flex flex-row gap-[20px] items-center rounded-[10px] w-full px-[20px] py-[6px] bg-white text-[20px] text-[#0c0c0c] leading-[30px] box-border hover:border ${className}`}
    >
      {children}
    </button>
  );
};

const PointsBox = ({ children, className }) => {
  return (
    <button
      className={`flex flex-row justify-between items-center rounded-[10px] w-full px-[20px] py-[6px] bg-white text-[20px] text-[#0c0c0c] leading-[30px] box-border hover:border ${className}`}
    >
      {children}
    </button>
  );
};

const SmallButton = ({ children, className}) => {
  return (
    <button
      className={`flex justify-center w-[203px] px-[10px] py-[6px] rounded-[4px] bg-[#70C174] text-[20px]  text-[#ffffff] leading-[23px] box-border hover:border hover:py-[5px] hover:px-[9px] ${className}`}
    >
      {children}
    </button>
  );
};

const RouteSelection = () => {
  return (
    <>
     <div className="flex flex-col m-[10px] h-[593px] bg-[#918d8db4] p-[20px] rounded-[10px] overflow-hidden">
        <div className="flex flex-col gap-[30px]">
          <div>
            <SmallBox>
              <img src={green} className="h-[30px]" />
              Taman Jurong Food Centre
            </SmallBox>
          </div>
          <div className="justify-between">
             <PointsBox>
                   <img src={location} className="h-[30px]" />
                   <p>Jurong Lake Gardens </p>
                   <img src={cross} className="" />
             </PointsBox>
          </div>
          <div className="flex justify-between flex-row">
             <PointsBox>
               <img src={location} className="h-[30px]" />
               Boon Lay Place Market 
               <img src={cross} className="justify-center items-center" />
             </PointsBox>
          </div>
          
          
          <SmallBox className="text-[#696868]">
            <img src={search} className="h-[30px]" />
            Add destination
          </SmallBox>        
        </div>
        <div className="flex justify-end mt-auto self-end">
           <SmallButton>Generate Route</SmallButton>
        </div>
     </div>
    </>

  )
}

export default RouteSelection
