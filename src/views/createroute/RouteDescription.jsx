import React from 'react';
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import smile from "../../assets/smile.svg";


const SmallBox = ({ children, className }) => {
  return (
    <button 
      className={`flex flex-col gap-[10px] py-[4px] mt-[10px] rounded-[10px] w-full px-[16px] text-[20px] text-[#0c0c0c] leading-[23px] box-border hover:border hover:py-[5px] hover:px-[9px] ${className}`}
    >
      {children}
    </button>
  );
};

const SmallButton = ({ children, className }) => {
  return (
    <button
      className={`mt-[8px] w-max text-[15px] text-[#2E57A7] hover:underline ${className}`}
    >
      {children}
    </button>
  );
};

const RouteDescription = () => {
  return (
    <>
      <div className="flex flex-col m-[10px] w-[387px] h-[593px] px-[12px] py-[13px] bg-[#918d8db4] p-[20px] rounded-[10px] overflow-hidden">
        <div className="flex flex-row items-center gap-[10px] flex-grow-8 bg-white m-[10px] rounded-[10px] text-black text-[20px] p-[10px]">
          <img src={star} className="self-end h-[40px]" />
          <p>New route created!</p>
        </div>
        <div className="flex flex-col flex-grow bg-white m-[10px] rounded-[10px]  text-black text-[20px] p-[16px]">
          <p>Route Details</p>
          <SmallBox className="bg-[#98bdfc81]">
            <div className="flex flex-row justify-between">
              <img src={sun} className="mt-[10px] mb-[10px]" />
              <div className="flex flex-col items-end">
                <h className="mt-[25px] text-[43px] text-[#565150] self-end">29 Aug</h>
                <p className="mt-[20px] text-[#565150] text-[24px] self-end">7:00 am</p>
                <p className="mt-[10px] mb-[10px] text-[#565150] text-[24px] self-end">Sunny | 32°C</p>
              </div>
            </div>
          </SmallBox>
          <SmallBox className="bg-[#bbdd8578]">
            <div className="flex flex-row gap-[25px] items-center">
              <p className="text-[#565150] text-[20px]">PM 2.5 Index: 30 µg/m³</p>
              <div className="mt-[5px]">
                <img src={smile} className="self-end h-[35px]" />
                <p className="mt-auto self-end text-[12px] text-[#565150]">Normal</p>
              </div>
            </div>    
          </SmallBox>
          <SmallBox  className="bg-[#ddd48576]">
             <p className="text-[#565150] mt-[10px] mb-[10px]">Route distance: 10.00 km</p>
          </SmallBox>
          <div className="flex justify-between mt-auto">
            <SmallButton>Edit route</SmallButton>
            <SmallButton>Cycle route</SmallButton>
          </div>   
        </div>
      </div>
    </>
  )
}

export default RouteDescription
