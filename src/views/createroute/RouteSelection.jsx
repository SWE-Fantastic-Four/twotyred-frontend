import React from "react";
import cross from "../../assets/cross.svg";
import green from "../../assets/green.svg";
import location from "../../assets/location.svg";
import search from "../../assets/search.svg";
import GreenButton from "./GreenButton";

const SmallBox = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex items-center rounded-[10px] sm:h-[51px] h-[42px] w-full sm:pl-[10px] pl-[8px] bg-white sm:text-[20px] hover:border hover:pl-[9px] shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const RouteSelection = ({ places, removeItem, setSelection, selection, start, onGenerate }) => {
  const placesList = places.map((place) => (
    <div key={place.id} className="flex flex-row bg-white rounded-[10px] sm:h-[51px] h-[42px] items-center sm:pl-[10px] pl-[8px] sm:pr-[25px] pr-[20px] hover:border sm:hover:pl-[9px] sm:hover:pr-[24px] hover:pl-[7px] hover:pr-[19px] cursor-default">
      <div className="sm:w-[40px] sm:h-[40px] w-[33px] h-[33px] flex justify-center items-center">
        <img
          src={location}
          className="sm:h-[40px] h-[34px]"
        />
      </div>
      <p className="sm:ml-[20px] ml-[16px] overflow-ellipsis whitespace-nowrap w-[75%] overflow-hidden text-left">
        {place.name}
      </p>
      <img
        className="ml-auto cursor-pointer"
        src={cross}
        onClick={() => removeItem(places.indexOf(place))}
      />
    </div>
  ));

  return (
    <>
      <div
        className={`flex flex-col sm:w-[387px] w-full text-[20px] ${
          start !== null && "sm:bg-[#918d8db4] sm:h-full"
        } sm:px-[12px] sm:py-[14px] py-[8px] rounded-[10px] overflow-hidden`}
      >
        <div className="flex flex-col sm:gap-[25px] gap-[20px]">
          <button className={`flex bg-white sm:h-[51px] h-[42px] rounded-[10px] items-center sm:pl-[10px] pl-[8px] sm:pr-[25px] pr-[20px] hover:border hover:pl-[9px] ${selection === 0 ? "border-2 sm:pl-[7.5px] hover:border-2 sm:hover:pl-[7.5px] pl-[5.5px] hover:pl-[5.5px]" : ""}`} onClick={() => setSelection(0)}>
            <div className="sm:h-[40px] sm:w-[40px] w-[33px] h-[33px] flex items-center justify-center">
              <img
                src={start === null ? search : green}
                className="sm:h-[40px] h-[32px]"
              />
            </div>
            <p className="sm:ml-[20px] ml-[16px] overflow-ellipsis whitespace-nowrap w-[75%] overflow-hidden text-left">
              {start === null ? "Enter Start Point" : start.name}
            </p>
          </button>
          {placesList}
          {start !== null && (
            <SmallBox
              onClick={() => setSelection(1)}
              className={selection === 1 ? "border-2 sm:pl-[7.5px] hover:border-2 sm:hover:pl-[7.5px] pl-[5.5px] hover:pl-[5.5px]" : ""}
            >
              <div className="sm:w-[40px] sm:h-[40px] w-[33px] h-[33px] flex items-center justify-center">
                <img
                  src={search}
                  className="sm:h-[40px] h-[28px]"
                />
              </div>
              <p className="sm:ml-[20px] ml-[16px] text-dark-gray">Add destination</p>
            </SmallBox>
          )}
        </div>
        {places.length > 0 && (
          <div className="sm:flex hidden justify-end mt-auto self-end">
            <GreenButton onClick={onGenerate}>Generate Route</GreenButton>
          </div>
        )}
      </div>
    </>
  );
};

export default RouteSelection;
