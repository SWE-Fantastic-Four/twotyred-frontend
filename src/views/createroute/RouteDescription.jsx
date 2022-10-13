import React, { useState, useEffect } from "react";
import smile from "../../assets/smile.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import cloudy from "../../assets/cloudy.svg"
import partCloudyDay from "../../assets/partCloudyDay.svg";
import partCloudyNight from "../../assets/partCloudyNight.svg";
import rain from "../../assets/rain.svg";
import thunderyShowers from "../../assets/thunderyShowers.svg";
import pmNormal from "../../assets/pmNormal.svg";
import pmElevated from "../../assets/pmElevated.svg";
import pmHigh from "../../assets/pmHigh.svg";
import pmVeryHigh from "../../assets/pmVeryHigh.svg";
import BottomDrawerButton from "../../assets/BottomDrawerButton.svg";
import { useSearchParams } from "react-router-dom";
import { Transition } from "@headlessui/react";
import axios from 'axios'



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

const RouteDescription = ({ routeDistance, onSave, shrinkMobileDrawer, expandMobileDrawer, start }) => {
;
  const [psi, setPsi] = useState("-");
  const [pm25, setPm25] = useState("-");
  const [pm25Img, setPm25Img] = useState("-");
  const [pm25Status, setPm25Status] = useState("-");
  const [date, setDate] = useState("-");
  const [temperature, setTemperature] = useState("-");
  const [time, setTime] = useState("-");
  const [weatherStatus, setWeatherStatus] = useState("-");
  const [weather, setWeather] = useState("unknown");
  const [weatherImg, setWeatherImg] = useState(sun);


  const [showDrawer, setShowDrawer] = useState(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
     
  const getWeatherImg = () => {
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
    }
  }

  const getPSIImg = () => {
    
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

  useEffect(() => {
    
    const getEnvs = async () => {
      const res = await axios.post(urls.backend + "/envfactors",{"lat": start.lat, "lng": start.lng});
      const data = res.data;
      setPsi(data['24HourPSI']);
      setPm25(data['PM2.5']);
      setDate(data['date'].split(" ").slice(0,2).join(' ')); // get 12 Aug from 12 Aug 2022
      setTemperature(data['temperature']);
      setTime(data['time']);
      setWeatherStatus(data['weatherStatus']);
    }
    getEnvs();
    getWeatherImg();
    getPSIImg();
  })

  return (
    <>
      {/* Desktop Route Description */}
      <div className="flex-col m-[10px] w-[387px] h-[calc(100%-20px)] px-[12px] py-[13px] bg-[#918d8db4] p-[20px] rounded-[10px] overflow-hidden hidden sm:flex">
        {/* <div className="flex flex-row items-center gap-[10px] flex-grow-8 bg-white m-[10px] rounded-[10px] text-black text-[20px] p-[10px]">
          <img src={star} className="self-end h-[40px]" />
          <p>New route created!</p>
        </div> */}
        <div className="flex flex-col flex-grow bg-white m-[10px] rounded-[10px]  text-black text-[20px] p-[16px]">
          <p>Route Details</p>
          <SmallBox className="bg-[#98bdfc81]">
            <div className="flex flex-row justify-between w-full">
              <img src={weatherImg} className="mt-[10px] mb-[10px]" />
              <div className="flex flex-col items-end">
                <h1 className="mt-[25px] text-[43px] text-[#565150] self-end">
                  {date}
                </h1>
                <p className="mt-[20px] text-[#565150] text-[24px] self-end">
                  {time}
                </p>
                {/* <p className="mt-[10px] mb-[10px] text-[#565150] text-[24px] self-end">
                  {weather} | {temperature}°C
                </p> */}
                <div className="flex mt-[10px] mb-[10px] text-[#565150] self-end">
                  <div className="flex items-center text-right pr-2 border-r-2 text-[20px]">{weather}</div> 
                  <div className="flex items-center text-left pl-2 text-[24px]">{temperature}°C</div>
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
       onTouchStart={() => setShowDrawer(!showDrawer)}
       beforeEnter={expandMobileDrawer}
       afterLeave={shrinkMobileDrawer}
      >
        <img
          src={BottomDrawerButton}
          className="w-[26px] absolute left-1/2 -translate-x-1/2 -translate-y-[6px]"
        />
        <h1 className="text-[22px] text-black leading-[26px]">Route Details</h1>
        <div className="bg-[#98BDFC81] pt-[14px] w-full pb-[20px] rounded-[10px] pl-[9px] pr-[33px] flex justify-between">
          <img src={sun} className="w-[97px] h-[97px]" />
          <div className="flex flex-col items-end">
            <p className="text-[36px] leading-[42px]">29 Aug</p>
            <p className="mt-[4px] text-[24px] leading-[28px]">7:00 am</p>
            <div className="h-[40px] flex justify-center items-center mt-[5px] text-[24px]">
              <div className="h-full border-r-[3px] border-[#565150] pr-[9px] flex items-center">
                Sunny
              </div>
              <p className="ml-[9px]">32°C</p>
            </div>
          </div>
        </div>
        <div className="bg-[#BCDD8581] w-full h-[56px] rounded-[10px] flex justify-between items-center pl-[17px] pr-[10px]">
          <p className="text-[18px]">
            PM 2.5 Index: 30 µg/m<sup>3</sup>
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
          <p className="hover:underline decoration-[#2E57A7]" onClick={(e) => {e.stopPropagation(); setSearchParams({page: "0", mode})}}>Edit route</p>
          <p className="hover:underline decoration-[#2E57A7]" onClick={onSave}>Cycle route</p>
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

export default RouteDescription;
