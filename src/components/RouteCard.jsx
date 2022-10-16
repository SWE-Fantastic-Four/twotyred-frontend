import {
  ArrowRightIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid
} from "@heroicons/react/24/solid";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../assets/ProfilePic.svg";
import { urls } from "../constants/constants";
import P from "../constants/paths";
import Map from "./Map";

const likeRequest = AwesomeDebouncePromise((username, id, url) => axios.post(url, { username, routeId: id }),500);
const favouriteRequest = AwesomeDebouncePromise((username, id, url) => axios.post(url, { user: username, route: id }),500);

/* 
  RouteCard.jsx implements the Route Card boundary class.
  The attributes implemented are:
  1. likes
  2. startPt 
  3. endPt 
  4. date as timestamp 
  5. username
  6. distance

  The key public methods are:
  1. favouriteRoute() under favouriteHandler(), which enables the user to add the route to his/her favourites
  2. unfavouriteRoute() under favouriteHandler(), which enables the user to remove the route from his/her favourites
  3. likeRoute() under likeHandler(), which enables the user to like the current route
  4. unlikeRoute() under likeHandler(), which enables the user to unlike the current route
  5. viewMore(), which redirects the user to the Route Description page for more information about the current route

  @author chayhuixiang
*/

export default function RouteCard({
  startPt,
  endPt,
  distance,
  timestamp,
  routeUsername,
  likes,
  id,
  isLiked,
  isFavourited,
  setFavouriteCount,
  refreshRoutes,
  routeGeom,
  duration,
  intermediatePts,
}) {
  const username = useSelector((state) => state.auth.displayName);
  const [starFilled, setStarFilled] = useState(isFavourited);
  const [heartFilled, setHeartFilled] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const navigate = useNavigate();

  const viewMore = () => {
    const mode = intermediatePts && intermediatePts.length === 0 ? "lucky" : "default";
    navigate(P.CREATEROUTE + `?page=1&mode=${mode}`, {
      state: {
        routeInfo: {
          routeGeom,
          routeDistance: distance,
          routeDuration: duration,
          start: startPt,
          places: intermediatePts,
        },
      },
    });
  };

  const getDate = () => {
    const time = new Date(timestamp * 1000).toISOString();
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const day = time.slice(8, 10);
    return `${day}/${month}/${year}`;
  };

  const getRouteName = () => {
    const name = id.slice(-3);
    let routeName = "";
    for (let i = 0; i < 3; i++) {
      let ascii = name.charCodeAt(i);
      routeName += ascii;
    }
    return routeName;
  };

  const favouriteHandler = async (e) => {
    e.stopPropagation();
    setStarFilled((prevValue) => !prevValue);
    // if (setFavouriteCount) {
    //   setFavouriteCount((prevValue) =>
    //     starFilled ? --prevValue : ++prevValue
    //   );
    // }
    const url = starFilled ? urls.backend + "/routes/unfavourite" : urls.backend + "/routes/favourite";
    try {
      const response = await favouriteRequest(username, id, url);
      console.log(response.data);
      if (refreshRoutes) {
        refreshRoutes();
      }
    } catch (error) {
      // if (setFavouriteCount) {
      //   setFavouriteCount((prevValue) => --prevValue);
      // }
      console.error(error);
    }
  };

  const likeHandler = async (e) => {
    e.stopPropagation();
    setHeartFilled((prevValue) => !prevValue);
    // setLikeCount((prevValue) => (heartFilled ? --prevValue : ++prevValue));
    const url = heartFilled ? urls.backend + "/routes/unlike" : urls.backend + "/routes/like";
    try {
      const response = await likeRequest(username, id, url);
      console.log(heartFilled ? "unlike" : "like");
      const data = response.data;
      console.log(data);
      setLikeCount(data.newLikeCount);
      if (refreshRoutes) {
        refreshRoutes();
      }
    } catch (error) {
      // setLikeCount(initialLikeCount);
      console.error(error);
    }
  };

  return (
    <motion.div
      className="wholecard sm:w-[337px] w-[288px] sm:h-[328px] h-[280.31px] rounded-[5px] border-[2px] border-solid border-black shadow-lg hover:cursor-pointer hover:outline-black"
      onClick={viewMore}
      whileHover={{ scale: 1.05 }}
      whileTap={{
        scale: 1,
      }}
    >
      <div className="map sm:h-[216px] h-[184.59px] overflow-x-hidden">
        <Map
          options={{ gestureHandling: "none", disableDefaultUI: true }}
          routeGeom={routeGeom}
        />
      </div>
      <div className="stats w-full sm:h-[112px] h-[95.72px] sm:pl-[15px] pl-[12.82px] sm:pr-[12px] pr-[10.26px] sm:pt-[12px] pt-[10.25px] sm:pb-[14px] flex flex-col">
        <div className="first flex justify-between items-center sm:text-[20px] text-[16.9139px] sm:leading-[23px] leading-[19.82px]">
          <h1 className="title font-[Roboto] font-bold leading-[20px] text-black ">
            Route #{getRouteName()}
          </h1>
          <div className="icons flex items-center">
            {/* star button */}
            <button onClick={favouriteHandler}>
              {starFilled ? (
                <StarIconSolid
                  className={`star stroke-[3] sm:h-[18px] h-[15.38px] text-yellow-300`}
                />
              ) : (
                <StarIcon className={`star stroke-[3] sm:h-[18px] h-[15.38px] text-black`} />
              )}
            </button>
            {/* heart button */}
            <button onClick={likeHandler}>
              {heartFilled ? (
                <HeartIconSolid
                  className={`heart stroke-[3] sm:h-[19px] h-[16.24px] pl-[4px] pr-[4px] text-red-600`}
                />
              ) : (
                <HeartIcon
                  className={`heart stroke-[3] sm:h-[19px] h-[16.24px] pl-[4px] pr-[4px] text-black`}
                />
              )}
            </button>
            <p className="totalLikes flex justify-start font-bold">
              {likeCount}
            </p>
          </div>
        </div>
        <div className="second flex sm:mt-[5px] mt-[4.27px] sm:text-[10px] text-[8.26px] sm:leading-[12px] leading-[10px] text-[#6B6B6B] font-normal whitespace-nowrap items-center">
          <p className="startlocation  overflow-hidden text-ellipsis">
            {startPt.name}
          </p>
          <ArrowRightIcon className="arrow sm:w-[11.26px] w-[9.62px] mx-[2px]" />
          <p className="endlocation mr-[3px]">{endPt.name}</p>
          <p className="ml-auto">| {Math.round(distance / 1000)}KM</p>
        </div>
        <div className="third flex sm:mt-[11px] mt-[8px] items-center">
          <img className="profilepic sm:w-[34px] sm:h-[34px] w-[29px] h-[29px]" src={ProfilePic} />
          <div className="userinfo pl-[5px]">
            <h1 className="name font-[Roboto] font-bold sm:text-[12px] text-[10.15px] leading-[14px] text-black">
              @{routeUsername}
            </h1>
            <p className="date font-[Roboto] font-normal sm:text-[10px] text-[8.46px] leading-[12px] text-[#6B6B6B]">
              {getDate()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
