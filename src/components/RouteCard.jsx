import {
  ArrowRightIcon, HeartIcon, StarIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import ProfilePic from "../assets/ProfilePic.svg";
import Map from "./Map";

export default function RouteCard({ likeCount }) {
  const [starFilled, setStarFilled] = useState(false);
  const [heartFilled, setHeartFilled] = useState(false);
  const [likeState, setLikeState] = useState(likeCount);

  const starClickHandler = async () => {
    setStarFilled(!starFilled)
    if (starFilled) {
      // increment favourite here
      try {
        // const response = await axios.post("dsadsad", { routeId });
        // const data = response.data;
        // setLikeState(data.likes);
      } catch (error) {
        console.error(error);
      }
    } else {
      // decrement favourite here
    }
  }
  const heartClickHandler = () => {
    setHeartFilled(!heartFilled)
    if (heartFilled) {
      // increment likes here
    } else {
      // decrement likes here
    }
  }

  return (
    <div className="wholecard w-[337px] h-[328px] rounded-[5px] border-[2px] border-solid border-dark-gray shadow-lg hover:border-black hover:cursor-pointer">
      <div className="map h-[216px] overflow-x-hidden">
        <Map options={{gestureHandling: 'none', disableDefaultUI: true}} />
      </div>
      <div className="stats w-[337px] h-[112px] pl-[15px] pr-[12px] pt-[12px] pb-[14px] flex flex-col">
        <div className="first flex justify-between items-center">
          <h1 className="title font-[Roboto] font-bold text-[20px] leading-[20px] text-black ">
            My first cycle
          </h1>
          <div className="icons flex items-center">
            {/* star button */}
            <button onClick={starClickHandler}>
              {starFilled ? (
                <StarIconSolid
                className={`star stroke-[3] h-[18px] text-yellow-300`}
                />
                ) : (
                <StarIcon
                  className={`star stroke-[3] h-[18px] text-black`}
                />
              )}
            </button>
            {/* heart button */}
            <button onClick={heartClickHandler}>
              {
                heartFilled ? (
                  <HeartIconSolid
                  className={`heart stroke-[3] h-[19px] pl-[4px] pr-[4px] text-red-600`}
                  />
                ):(
                  <HeartIcon
                  className={`heart stroke-[3] h-[19px] pl-[4px] pr-[4px] text-black`}
                  />
                )
              }
            </button>
            <p className="totalLikes flex justify-start font-bold text-[20px] leading-[23px]">
              {likeState}
            </p>
          </div>
        </div>
        <div className="second flex mt-[5px] text-[10px] leading-[12px] text-[#6B6B6B] font-normal whitespace-nowrap">
          <p className="startlocation  overflow-hidden text-ellipsis">
            Boon Lay Place Market and Food Centre
          </p>
          <ArrowRightIcon className="arrow w-[11.26px] mx-[2px]" />
          <p className="endlocation mr-[3px]">
            Taman Jurong Food Centre 
          </p>
          <p className="ml-auto">| 5KM</p>
        </div>
        <div className="third flex mt-[11px]">
          <img
            className="profilepic w-[34px] h-[34px]"
            src={ProfilePic}
          />
          <div className="userinfo pt-[3px] pl-[5px]">
            <h1 className="name font-[Roboto] font-bold text-[12px] leading-[14px] text-black">
              @janedoe
            </h1>
            <p className="date font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
              11/9/2022
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
