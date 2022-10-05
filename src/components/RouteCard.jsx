import React from "react";
import {
  StarIcon,
  HeartIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Map from "./Map";
import { useState } from "react";

// function changefill(){
//     setcolour(function(oldValue){
//         return !oldValue;
//     })
//     console.log(colour)
// }

// function changefill(){
//     console.log("fuck");
//     setcolour("notshag");
// }

export default function RouteCard() {
  const [starFilled, setStarFilled] = useState(false);

//   const [heartColour, setHeartColour] = React.useState("black");
  const [heartFilled, setHeartFilled] = React.useState(false);

//   const heart = {
//     fillstate: heartFilled,
//     colourstate: heartColour,
//   };
//   function changeHeartColour() {
//     setHeartColour(function (oldValue) {
//       return heartColour == "black" ? "red-600" : "black";
//     });
//   }
//   function changeHeartFill() {
//     setHeartFilled(function (oldValue) {
//       return heartFilled == HeartIcon ? HeartIconSolid : HeartIcon;
//     });
//   }

//   function clickHeart() {
//     changeHeartColour();
//     changeHeartFill();
//   }

  return (
    <div className="wholecard w-[337px] h-[328px] rounded-[5px] border-[2px] border-solid border-dark-gray shadow-lg hover:border-black hover:cursor-pointer">
      <div className="map h-[216px] overflow-x-hidden">
        <Map />
      </div>
      <div className="stats w-[337px] h-[112px] flex flex-col">
        <div className="first pl-[15px] pr-[12px] flex justify-between">
          <h1 className="title pt-[12px] font-[Roboto] font-bold text-[20px] leading-[20px] text-black ">
            My first cycle
          </h1>
          <div className="icons flex justify-[right]">
            <button onClick={() => setStarFilled(!starFilled)}>
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
            <button onClick={()=>setHeartFilled(!heartFilled)}>
              {
                heartFilled ? (
                  <HeartIconSolid
                  className={`heart stroke-[3] mt-[7px] h-[19px] pl-[4px] pr-[4px] text-red-600`}
                  />
                ):(
                  <HeartIcon
                  className={`heart stroke-[3] mt-[7px] h-[19px] pl-[4px] pr-[4px] text-black`}
                  />
                )
              }
            </button>
            <h1 className="totalLikes flex justify-start mt-2 font-bold text-[20px]">
              5000
            </h1>
          </div>
        </div>
        <div className="second flex pt-[5px] pl-[15px]">
          <p className="startlocation font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
            Boon Lay Place Market and Fo...
          </p>
          <ArrowRightIcon className="arrow w-[11.26px] h-[12]" />
          <p className="endlocation font-[Roboto] font-normal text-[10px] leading-[12px] text-[#6B6B6B]">
            Taman Jurong Food Centre | 5KM
          </p>
        </div>
        <div className="third flex pl-[15px] pt-[8px]">
          <img
            className="profilepic w-[34px] h-[34px] left-[122px] top-[589px]"
            src="src\assets\ProfilePic.svg"
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
