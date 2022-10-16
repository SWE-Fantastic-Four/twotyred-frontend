import { Transition } from "@headlessui/react";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BottomDrawerButton from "../../assets/BottomDrawerButton.svg";
import cloudy from "../../assets/cloudy.svg";
import moon from "../../assets/moon.svg";
import partCloudyDay from "../../assets/partCloudyDay.svg";
import partCloudyNight from "../../assets/partCloudyNight.svg";
import pmElevated from "../../assets/pmElevated.svg";
import pmHigh from "../../assets/pmHigh.svg";
import pmNormal from "../../assets/pmNormal.svg";
import pmVeryHigh from "../../assets/pmVeryHigh.svg";
import rain from "../../assets/rain.svg";
import smile from "../../assets/smile.svg";
import sun from "../../assets/sun.svg";
import thunderyShowers from "../../assets/thunderyShowers.svg";
import { urls } from "../../constants/constants";

/* 
  RouteDescription.jsx implements the Route Description Page boundary class.
  The attributes implemented are:
  1. routeDistance
  2. routeWeather
  3. routePM2.5Index as pm25 
  4. routeDate 
  5. routeTemperature

  The key public methods are:
  1. cycleRoute(), which saves the current route into the database
  2. editRoute(), which enables the user to head back to the route planning page and edit the current route

  @author chayhuixiang
*/

const RouteDescription = ({ routeDistance, onSave, shrinkMobileDrawer, expandMobileDrawer, start }) => {
  const [pm25, setPm25] = useState("-");
  const [pm25Img, setPm25Img] = useState(pmNormal);
  const [pm25Status, setPm25Status] = useState("-");
  const [routeDate, setDate] = useState("-");
  const [routeTemperature, setTemperature] = useState("-");
  const [routeTime, setTime] = useState("-");
  const [routeWeather, setWeather] = useState("unknown");
  const [weatherImg, setWeatherImg] = useState(sun);

  const [showDrawer, setShowDrawer] = useState(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const cycleRoute = (e) => {
    e.stopPropagation(); 
    onSave(setShowDrawer);
  }

  const editRoute = (e) => {
    e.stopPropagation(); 
    setSearchParams({page: "0", mode});
  }
  
  useEffect(() => {
    const getWeatherImg = (weatherStatus) => {
      switch(weatherStatus){
        case "Fair(Day)":
          setWeather("Sunny");
          setWeatherImg(sun);
          break;
        case "Fair(Night)":
          setWeather("Fair");
          setWeatherImg(moon);
          break;
        case "Partly Cloudy (Day)":
          setWeather("Partly Cloudy");
          setWeatherImg(partCloudyDay);
          break;
        case "Partly Cloudy (Night)":
          setWeather("Partly Cloudy");
          setWeatherImg(partCloudyNight);
          break;
        case "Cloudy":
          setWeather("Cloudy");
          setWeatherImg(cloudy);
          break;
        case "Light Rain":
        case "Moderate Rain":
        case "Light Showers":
        case "Showers":
          setWeather("Rain");
          setWeatherImg(rain);
          break;
        case "Thundery Showers":
        case "Heavy Thundery Showers":
        case "Heavy Thundery Showers with Gusty Winds":
          setWeather("Thundery Showers");
          setWeatherImg(thunderyShowers);
          break;
        default:
          setWeather("Unknown");
          setWeatherImg(sun);
          break;
      }
    }
  
    const getPSIImg = (pm25) => {
      if (0 < pm25 && pm25 <= 55){
        setPm25Img(pmNormal);
        setPm25Status("Normal");
      }
      else if (55 < pm25 && pm25 <= 150){
        setPm25Img(pmElevated);
        setPm25Status("Elevated");
      }
      else if (150 < pm25 && pm25 <= 250){
        setPm25Img(pmHigh);
        setPm25Status("High");
      }
      else if (pm25 > 250) {
        setPm25Img(pmVeryHigh);
        setPm25Status("Very High");
      }
      else {
        setPm25Img(pmElevated);
        setPm25Status("Unknown");
      }
    }
    const getEnvs = async (lat, lng) => {
      const res = await axios.post(urls.backend + "/envfactors", { lat, lng });
      const data = res.data;
      const fetchedpm25 = data['PM2.5'];
      const fetchedWeatherStatus = data['weatherStatus'];
      setPm25(fetchedpm25);
      setDate(data['date'].split(" ").slice(0,2).join(' ')); // get 12 Aug from 12 Aug 2022
      setTemperature(data['temperature']);
      setTime(data['time']);
      getWeatherImg(fetchedWeatherStatus);
      getPSIImg(fetchedpm25);
    }
    if (start && start.lat && start.lng) {
      getEnvs(start.lat, start.lng);
    }
  },[start]);

  return (
    <>
      {/* Desktop Route Description */}
      <div className="flex-col m-[10px] w-[387px] h-[calc(100%-20px)] px-[12px] py-[13px] bg-[#918d8db4] p-[20px] rounded-[10px] overflow-hidden hidden sm:flex">
        <div className="flex flex-col flex-grow bg-white m-[10px] rounded-[10px]  text-black text-[20px] p-[16px]">
          <p>Route Details</p>
          <SmallBox className="bg-[#98bdfc81]">
            <div className="flex flex-row justify-between w-full">
              <img src={weatherImg} className="mt-[10px] mb-[10px]" />
              <div className="flex flex-col items-end">
                <h1 className="mt-[25px] text-[43px] text-[#565150] self-end">
                  {routeDate}
                </h1>
                <p className="mt-[20px] text-[#565150] text-[24px] self-end">
                  {routeTime}
                </p>
                <div className="flex mt-[10px] mb-[10px] text-[#565150] self-end">
                  <div className="flex items-center text-right pr-2 border-r-2 text-[20px]">{routeWeather}</div> 
                  <div className="flex items-center text-left pl-2 text-[24px]">{routeTemperature}°C</div>
                </div>
              </div>
            </div>
          </SmallBox>
          <SmallBox className="bg-[#bbdd8578]">
            <div className="flex flex-row gap-[25px] items-center">
              <p className="text-[#565150] text-[20px]">
                PM 2.5 Index: {pm25} µg/m³
              </p>
              <div className="mt-[5px]">
                <img src={pm25Img} className="self-end h-[35px]" />
                <p className="mt-auto self-end text-[12px] text-[#565150]">
                  {pm25Status}
                </p>
              </div>
            </div>
          </SmallBox>
          <SmallBox className="bg-[#ddd48576]">
            <p className="text-[#565150] mt-[10px] mb-[10px]">
              Route distance: {(routeDistance / 1000).toFixed(2)} km
            </p>
          </SmallBox>
          <div className="flex justify-between mt-auto">
            <SmallButton onClick={() => setSearchParams({page: "0", mode})}>Edit route</SmallButton>
            <SmallButton onClick={onSave}>Cycle route</SmallButton>
          </div>
        </div>
      </div>
      {/* Mobile & Tablet Route Description */}
      <Transition
       className={`w-full bg-white text-[#565150] h-full absolute bottom-0 rounded-t-[10px] flex sm:hidden flex-col px-[15px] pt-[22px] pb-[10px] font-medium gap-[11px] z-10`} 
       show={showDrawer}
       enter="transition-all duration-500 ease-in-out"
       enterFrom="translate-y-[355px]"
       enterTo="translate-y-0"
       leave="transition-all duration-500 ease-in-out"
       leaveFrom="translate-y-0"
       leaveTo="translate-y-[355px]"
       beforeEnter={expandMobileDrawer}
       afterLeave={shrinkMobileDrawer}
      >
        <div 
          className="w-[100px] h-[13px] absolute left-1/2 -translate-x-1/2 -translate-y-[12px] flex justify-center items-center"
          onTouchStart={() => setShowDrawer(!showDrawer)}
        >
          <img
            src={BottomDrawerButton}
            className="w-[26px] m-auto"
          />
        </div>
        <h1 className="text-[22px] text-black leading-[26px]">Route Details</h1>
        <div className="bg-[#98BDFC81] pt-[14px] w-full pb-[20px] rounded-[10px] pl-[9px] pr-[33px] flex justify-between">
          <img src={weatherImg} className="w-[97px] h-[97px]" />
          <div className="flex flex-col items-end">
            <p className="text-[36px] leading-[42px]">{routeDate}</p>
            <p className="mt-[4px] text-[24px] leading-[28px]">{routeTime}</p>
            <div className="flex justify-center items-center mt-[5px] text-[20px]">
              <div className="h-full border-r-[3px] border-[#565150] pr-[9px] flex items-center text-right">
                {routeWeather}
              </div>
              <p className="ml-[9px]">{routeTemperature}°C</p>
            </div>
          </div>
        </div>
        <div className="bg-[#BCDD8581] w-full h-[56px] rounded-[10px] flex justify-between items-center pl-[17px] pr-[10px]">
          <p className="text-[18px]">
            PM 2.5 Index: {pm25} µg/m<sup>3</sup>
          </p>
          <div className="flex flex-col items-center">
            <img src={smile} />
            <p className="text-[15px] leading-[16px]">Normal</p>
          </div>
        </div>
        <div className="bg-[#DDD48581] rounded-[10px] w-full h-[56px] flex items-center pl-[17px] text-[18px]">
          <p>Route distance: {(routeDistance / 1000).toFixed(2)} km</p>
        </div>
        <div className="mt-auto text-[#2E57A7] text-[22px] w-full flex justify-between">
          <p className="hover:underline decoration-[#2E57A7]" onClick={editRoute}>Edit route</p>
          <p className="hover:underline decoration-[#2E57A7]" onClick={cycleRoute}>Cycle route</p>
        </div>
      </Transition>
      <div className="w-full h-[59px] bg-white absolute bottom-0 rounded-t-[10px] flex sm:hidden flex-col px-[15px] pt-[22px] pb-[10px] font-medium z-0" onTouchStart={() => setShowDrawer(!showDrawer)}>
        <img
          src={BottomDrawerButton}
          className="w-[26px] absolute left-1/2 -translate-x-1/2 -translate-y-[6px]"
        />
        <h1 className="text-[22px] text-black leading-[26px]">Route Details</h1>
      </div>
    </>
  );
};

const SmallBox = ({ children, className }) => {
  return (
    <button
      className={`flex flex-col gap-[10px] py-[4px] mt-[10px] rounded-[10px] w-full px-[16px] text-[20px] text-[#0c0c0c] leading-[23px] box-border hover:border hover:py-[3px] hover:px-[15px] ${className}`}
    >
      {children}
    </button>
  );
};

const SmallButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`mt-[8px] w-max text-[15px] text-[#2E57A7] hover:underline rounded-[4px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RouteDescription;
