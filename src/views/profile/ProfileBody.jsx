import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RouteCard from '../../components/RouteCard';

const ProfileBody = ({ className }) => {
  const username = useSelector(state => state.auth.displayName);
  const [showFavourites, setShowFavourites] = useState(false);
  const [routes, showRoutes] = useState([]);
  const [favouriteRoutes, setFavouriteRoutes] = useState([]);
  const [routeCount, updateRouteCount] = useState(0);
  const [favouriteCount, updateFavouriteCount] = useState(0);

  useEffect(() => {
    const obtainRoutes = async () => {
      const response = await fetch(`https://swe-backend.chayhuixiang.repl.co/routes/user/${username}`);
      const data = await response.json();
      updateRouteCount(data.routeInfoArray.length);
      showRoutes(data.routeInfoArray);
    }

    if (username) {
      obtainRoutes();
    }
  }, [username]);

  useEffect(() => {
    const obtainFavouriteRoutes = async () => {
      const response = await fetch(`https://swe-backend.chayhuixiang.repl.co/routes/user/${username}?favourite=true`);
      const data = await response.json();
      updateFavouriteCount(data.routeInfoArray.length)
      setFavouriteRoutes(data.routeInfoArray);
    }

    if (username) {
      obtainFavouriteRoutes();
    }
  }, [username]);

  return (
    <div className={`w-full flex flex-col items-center ${className} font-medium sm:text-[15px] text-[11.1px]`}>
      {/* w-screen */}
      <div className="sm:w-[284px] w-[210px] border-b flex mb-[10px]">
        <div className="w-1/2 flex justify-center items-center">
          <div className={`border-b-[3px] ${showFavourites ? "border-transparent" : ""} flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`} onClick={() => setShowFavourites(false)}>
            <div className="mr-[3px]">Past Routes</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px] pt-[1px]">{routeCount}</div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className={`border-b-[3px] ${!showFavourites ? "border-transparent" : ""} flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`} onClick={() => setShowFavourites(true)}>
            <div className="mr-[3px]">Favourites</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px] pt-[1px]">{favouriteCount}</div>
          </div>
        </div>
      </div>
      {showFavourites && favouriteRoutes.length !== 0 && favouriteRoutes.map((route) => {
        return (<RouteCard key={route.id} startPt={route.routeInfo.StartPt.name} endPt={route.routeInfo.EndPt.name} distance={route.routeInfo.Distance} timestamp={route.routeInfo.Timestamp._seconds} username={route.routeInfo.Username} likes={route.routeInfo.Likes} id={route.id} />)
      })}
      {!showFavourites && routes.length !== 0 && routes.map((route) => {
        return (<RouteCard key={route.id} startPt={route.routeInfo.StartPt.name} endPt={route.routeInfo.EndPt.name} distance={route.routeInfo.Distance} timestamp={route.routeInfo.Timestamp._seconds} username={route.routeInfo.Username} likes={route.routeInfo.Likes} id={route.id} />)
      })}
    </div>
  )
}

export default ProfileBody
