import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import RouteCard from "../../components/RouteCard";
import { urls } from "../../constants/constants";
import RouteCardLoadingSet from "../../components/RouteCardLoading/RouteCardLoadingSet";

const ProfileBody = ({ className }) => {
  const username = useSelector((state) => state.auth.displayName);
  const [showFavourites, setShowFavourites] = useState(false);
  const [routes, showRoutes] = useState([]);
  const [favouriteRoutes, setFavouriteRoutes] = useState([]);
  const [routeCount, updateRouteCount] = useState(0);
  const [favouriteCount, updateFavouriteCount] = useState(0);

  const obtainRoutes = useCallback(() => {
    // obtain user routes
    const obtainUserRoutes = async() => {
      const response = await fetch(`${urls.backend}/routes/user/${username}`);
      const data = await response.json();
      updateRouteCount(data.routeInfoArray.length);
      showRoutes(data.routeInfoArray);
    }

    // obtain favourite routes
    const obtainFavouriteRoutes = async() => {
      const response = await fetch(
        `${urls.backend}/routes/user/${username}?favourite=true`
      );
      const data = await response.json();
      updateFavouriteCount(data.routeInfoArray.length);
      setFavouriteRoutes(data.routeInfoArray);
    }
    obtainFavouriteRoutes();
    obtainUserRoutes();
  }, [username]);

  useEffect(() => {
    if (username) {
      try {
        obtainRoutes();
      } catch (error) {
        // TODO: error handling
        console.error(error.message);
      }
    }
  }, [username]);

  return (
    <div
      className={`w-full flex flex-col items-center ${className} font-medium sm:text-[15px] text-[11.1px]`}
    >
      <div className="sm:w-[284px] w-[210px] border-b flex">
        <div className="w-1/2 flex justify-center items-center">
          <div
            className={`border-b-[3px] ${
              showFavourites ? "border-transparent" : ""
            } flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`}
            onClick={() => setShowFavourites(false)}
          >
            <div className="mr-[3px]">Past Routes</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px]">
              {routeCount}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div
            className={`border-b-[3px] ${
              !showFavourites ? "border-transparent" : ""
            } flex items-center cursor-pointer sm:leading-[18px] leading-[14px] sm:pb-[4px] pb-[3px]`}
            onClick={() => setShowFavourites(true)}
          >
            <div className="mr-[3px]">Favourites</div>
            <div className="sm:px-[2px] px-[1.5px] sm:h-[17px] h-[13px] bg-gray rounded-full mb-[2px]">
              {favouriteCount}
            </div>
          </div>
        </div>
      </div>
      <div className="Cards grid computer:grid-cols-3 gap-4 sm:mt-[20px] mt-[10px] phone:grid-cols-1 tablet:grid-cols-2">
        {showFavourites &&
          (favouriteRoutes.length !== 0 ?
          favouriteRoutes.map((route) => {
            return (
              <RouteCard
                key={route.id}
                startPt={route.routeInfo.StartPt}
                endPt={route.routeInfo.EndPt}
                intermediatePts={route.routeInfo.IntermediatePts}
                distance={route.routeInfo.Distance}
                timestamp={route.routeInfo.Timestamp._seconds}
                routeUsername={route.routeInfo.Username}
                likes={route.routeInfo.Likes}
                id={route.id}
                likedUsers={route.routeInfo.LikedUsers}
                favouritedUsers={route.routeInfo.FavouritedUsers}
                isLiked={route.routeInfo.LikedUsers.includes(username)}
                isFavourited={route.routeInfo.FavouritedUsers.includes(username)}
                setFavouriteCount={updateFavouriteCount}
                refreshRoutes={obtainRoutes}
                routeGeom={route.routeInfo.Geometry}
                duration={route.routeInfo.Duration}
              />
            );
          }) : <RouteCardLoadingSet />)
          }
        {!showFavourites &&
          (routes.length !== 0 ?
          routes.map((route) => {
            return (
              <RouteCard
                key={route.id}
                startPt={route.routeInfo.StartPt}
                endPt={route.routeInfo.EndPt}
                intermediatePts={route.routeInfo.IntermediatePts}
                distance={route.routeInfo.Distance}
                timestamp={route.routeInfo.Timestamp._seconds}
                routeUsername={route.routeInfo.Username}
                likes={route.routeInfo.Likes}
                id={route.id}
                likedUsers={route.routeInfo.LikedUsers}
                favouritedUsers={route.routeInfo.FavouritedUsers}
                isLiked={route.routeInfo.LikedUsers.includes(username)}
                isFavourited={route.routeInfo.FavouritedUsers.includes(username)}
                setFavouriteCount={updateFavouriteCount}
                refreshRoutes={obtainRoutes}
                routeGeom={route.routeInfo.Geometry}
                duration={route.routeInfo.Duration}
              />
            );
          }) : <RouteCardLoadingSet />)
          }
      </div>
    </div>
  );
};

export default ProfileBody;
