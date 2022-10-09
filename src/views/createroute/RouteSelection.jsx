import React, { useState } from 'react';
import location from "../../assets/location.svg";
import green from "../../assets/green.svg";
import search from "../../assets/search.svg";
import cross from "../../assets/cross.svg";

const SmallBox = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex flex-row gap-[20px] items-center rounded-[10px] w-full px-[20px] py-[14px] hover:px-[19px] hover:py-[13px] bg-white text-[20px] text-[#0c0c0c] leading-[23px] box-border hover:border ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PlaceBox = ({ children, className }) => {
  return (
    <button
      className={`flex gap-[23px] items-center rounded-[10px] mt-[-50px] w-full px-[20px] py-[14px] bg-white text-[20px] text-[#0c0c0c] leading-[23px] box-border hover:border hover:px-[19px] hover:py-[13px] ${className}`}
    >
      {children}
    </button>
  );
};

const SmallButton = ({ children, className, onClick}) => {
  return (
    <button
      className={`flex justify-center w-[203px] h-[55px] items-center px-[10px] py-[6px] rounded-[4px] bg-[#70C174] text-[20px]  text-[#ffffff] leading-[23px] box-border hover:border hover:py-[5px] hover:px-[9px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const RouteSelection = ({ places, removeItem, setSelection, setPage }) => {
  const placesList = places.map(place =>
    <li key={place.id} value={place.name}>
      <div className="flex justify-between flex-row">
        <PlaceBox>  
          <div className="flex flex-grow-0"><img src={location} className="h-[40px] mt-[-9px] mb-[-9px]" /></div>
          <div className="flex flex-grow"><p>{place.name} </p></div>
          <div className="flex flex-grow-1"><img src={cross} onClick={() => removeItem(places.indexOf(place))} /></div>
        </PlaceBox>
      </div>
    </li>
  );

  return (
    <>
      <div className="flex flex-col m-[10px] h-[593px] w-[387px] bg-[#918d8db4] px-[12px] py-[14px] rounded-[10px] overflow-hidden">
        <div className="flex flex-col gap-[25px]">
          <div>
            <SmallBox onClick={() => setSelection(0)}>
              <img src={green} className="h-[40px] mt-[-9px] mb-[-9px]" />
              Taman Jurong Food Centre
            </SmallBox>
          </div>
          {placesList}
          <SmallBox className="text-[#696868]" onClick={() => setSelection(1)}>
            <img src={search} className="h-[40px] mt-[-9px] mb-[-9px]" />
            Add destination
          </SmallBox>        
        </div>
        <div className="flex justify-end mt-auto self-end">
          <SmallButton onClick={() => setPage(1)}>Generate Route</SmallButton>
        </div>
      </div>
    </>
  )
}

export default RouteSelection
