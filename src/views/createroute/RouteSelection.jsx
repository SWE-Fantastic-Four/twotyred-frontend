import React from "react";
import cross from "../../assets/cross.svg";
import green from "../../assets/green.svg";
import location from "../../assets/location.svg";
import search from "../../assets/search.svg";
import GreenButton from "./GreenButton";

const SmallBox = ({ children, className, onClick }) => {
  return (
    <button
      className={`flex flex-row gap-[20px] items-center rounded-[10px] w-full px-[20px] sm:py-[14px] py-[10px] sm:hover:px-[19px] sm:hover:py-[13px] hover:py-[10px] bg-white sm:text-[20px] text-[18px] text-[#0c0c0c] leading-[23px] box-border hover:border shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PlaceBox = ({ children, className }) => {
  return (
    <button
      className={`flex gap-[23px] items-center rounded-[10px] mt-[-50px] w-full px-[20px] sm:py-[14px] py-[10px] hover:py-[10px] bg-white sm:text-[20px] text-[18px] text-[#0c0c0c] leading-[23px] box-border hover:border hover:px-[19px] sm:hover:py-[13px] shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

const RouteSelection = ({
  places,
  removeItem,
  setSelection,
  selection,
  start,
}) => {
  const placesList = places.map((place) => (
    <li key={place.id} value={place.name}>
      <div className="flex justify-between flex-row">
        <PlaceBox>
          <div className="flex flex-grow-0">
            <img
              src={location}
              className="sm:h-[40px] h-[34px] mt-[-9px] mb-[-9px]"
            />
          </div>
          <div className="flex flex-grow w-[61%]">
            <p className="overflow-ellipsis whitespace-nowrap w-full overflow-hidden text-left">
              {place.name}
            </p>
          </div>
          <div className="flex flex-grow-1">
            <img
              src={cross}
              onClick={() => removeItem(places.indexOf(place))}
            />
          </div>
        </PlaceBox>
      </div>
    </li>
  ));

  return (
    <>
      <div
        className={`flex flex-col sm:w-[387px] w-full ${
          start !== null && "sm:bg-[#918d8db4] sm:h-full"
        } sm:px-[12px] sm:py-[14px] py-[8px] rounded-[10px] overflow-hidden`}
      >
        <div className="flex flex-col sm:gap-[25px] gap-[20px]">
          <div>
            <SmallBox
              onClick={() => setSelection(0)}
              className={
                selection === 0
                  ? "border-2 border-black hover:border-2 sm:py-[12px] sm:hover:py-[12px] py-[8px] hover:py-[8px] px-[19px] hover:px-[19px] text-[#696868]"
                  : "text-[#696868]"
              }
            >
              <img
                src={start === null ? search : green}
                className="sm:h-[40px] h-[32px] mt-[-9px] mb-[-9px]"
              />
              <p className="overflow-ellipsis whitespace-nowrap w-[61%] overflow-hidden text-left">
                {start === null ? "Enter Start Point" : start.name}
              </p>
            </SmallBox>
          </div>
          {placesList}
          {start !== null && (
            <SmallBox
              onClick={() => setSelection(1)}
              className={
                selection === 1
                  ? "border-2 border-black hover:border-2 sm:py-[12px] sm:hover:py-[12px] py-[8px] hover:py-[8px] px-[19px] hover:px-[19px] text-[#696868]"
                  : "text-[#696868]"
              }
            >
              <img
                src={search}
                className="sm:h-[40px] h-[28px] mt-[-9px] mb-[-9px]"
              />
              Add destination
            </SmallBox>
          )}
        </div>
        {places.length > 0 && (
          <div className="sm:flex hidden justify-end mt-auto self-end">
            <GreenButton>Generate Route</GreenButton>
          </div>
        )}
      </div>
    </>
  );
};

export default RouteSelection;
