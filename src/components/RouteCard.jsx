import {
  ArrowRightIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ProfilePic from "../assets/ProfilePic.svg";
import Map from "./Map";
import axios from "axios";
import { useSelector } from "react-redux";
import { urls } from "../constants/constants";

export default function RouteCard({ startPt, endPt, distance, timestamp, username, likes, id }) {
  const [starFilled, setStarFilled] = useState(false);
  const [heartFilled, setHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const getDate = () => {
    const time = new Date(timestamp * 1000).toISOString();
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const day = time.slice(8, 10);
    return (`${day}/${month}/${year}`);
  }

  const getRouteName = () => {
    const name = id.slice(-3);
    let routeName = "";
    for (let i = 0; i < 3; i++) {
      let ascii = name.charCodeAt(i);
      routeName += ascii;
    }
    return routeName;
  }

  const starClickHandler = async () => {
    setStarFilled(!starFilled);
    const url = starFilled ? urls.backend + "/routes/favourite" : urls.backend + "/routes/unfavourite";
    try {
      const response = await axios.post(url, { user: username, route: routeId });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const heartClickHandler = async () => {
    setHeartFilled(!heartFilled);
    const url = heartFilled ? urls.backend + "/routes/like" : urls.backend + "/routes/unlike";
    try {
      const response = await axios.post(url, { username, routeId });
      const data = response.data;
      setLikeState(data.newLikeCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wholecard w-[337px] h-[328px] rounded-[5px] border-[2px] border-solid border-dark-gray shadow-lg hover:border-black hover:cursor-pointer">
      <div className="map h-[216px] overflow-x-hidden">
        <Map options={{ gestureHandling: 'none', disableDefaultUI: true }} />
      </div>
      <div className="stats w-[337px] h-[112px] flex flex-col">
        <div className="first pl-[15px] pr-[12px] flex justify-between">
          <h1 className="title pt-[12px] font-[Roboto] font-bold text-[20px] leading-[20px] text-black ">
            Route #{getRouteName()}
          </h1>
          <div className="icons flex justify-[right]">
            {/* star button */}
            <button onClick={starClickHandler}>
              {starFilled ? (
                <StarIconSolid
                  className={`star stroke-[3] mt-[7px] h-[18px] text-yellow-300`}
                />
              ) : (
                <StarIcon
                  className={`star stroke-[3] mt-[7px] h-[18px] text-black`}
                />
              )}
            </button>
            {/* heart button */}
            <button onClick={heartClickHandler}>
              {heartFilled ? (
                <HeartIconSolid
                  className={`heart stroke-[3] mt-[7px] h-[19px] pl-[4px] pr-[4px] text-red-600`}
                />
              ) : (
                <HeartIcon
                  className={`heart stroke-[3] mt-[7px] h-[19px] pl-[4px] pr-[4px] text-black`}
                />
              )}
            </button>
            <h1 className="totalLikes flex justify-start mt-2 font-bold text-[20px]">
              {likes}
            </h1>
          </div>
        </div>
        <div className="second flex pt-[5px] pl-[15px]">
          <p className="startlocation font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
            {startPt}
          </p>
          <ArrowRightIcon className="arrow w-[11.26px] h-[12] mx-[2px]" />
          <p className="endlocation font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
            {endPt} | {distance / 1000}KM
          </p>
        </div>
        <div className="third flex pl-[15px] pt-[8px]">
          <img
            className="profilepic w-[34px] h-[34px] left-[122px] top-[589px]"
            src={ProfilePic}
          />
          <div className="userinfo pt-[3px] pl-[5px]">
            <h1 className="name font-[Roboto] font-bold text-[12px] leading-[14px] text-black">
              @{username}
            </h1>
            <p className="date font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
              {getDate()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
