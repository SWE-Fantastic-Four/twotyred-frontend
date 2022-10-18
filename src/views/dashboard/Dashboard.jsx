import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../../components/Filter";
import RouteCard from "../../components/RouteCard";
import RouteCardLoadingSet from "../../components/RouteCardLoading/RouteCardLoadingSet";
import { urls } from "../../constants/constants";
import MainLayout from "../../layout/MainLayout";

/* 
  Dashboard.jsx implements the Dashboard boundary class.
  The attributes implemented are:
  1. allRoutes as routes
  2. mostLikedRoutes as routes

  The key public methods are:
  1. dashboardRoutes() under obtainRoutes(), which fetches the list of routes to be rendered on the dashboard

  @author chayhuixiang
*/

/* 
  Dashboard.jsx implements the RouteCardSet boundary class.
  The attributes implemented are:
  1. routeCards

  @author chayhuixiang
*/

const Dashboard = () => {
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [routeOption, setRouteOption] = useState(0); // 0 is for showing recent, 1 is for showing likes
  const username = useSelector((state) => state.auth.displayName);

  useEffect(() => {
    const obtainRoutes = async () => {
      setLoadingRoutes(true);
      let url = "";
      if (routeOption === 0) {
        url = `${urls.backend}/routes/dashboard`;
      } else if (routeOption === 1) {
        url = `${urls.backend}/routes/dashboard?like=true`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRoutes(data.routeInfoArray);
      } catch (error) {
        // TODO: error handling
        console.error(error.message);        
      } finally {
        setLoadingRoutes(false);
      }
    };
    obtainRoutes();
  }, [routeOption]);

  return (
    <MainLayout>
      <div className="max-w-[var(--max-screen-width)] w-full sm:px-[106px] px-[16px]">
        <div className="mt-[47px] flex flex-col">
          <div className="headers flex">
            <span className="font-bold md:text-[64px] sm:text-[52px] text-[32px] mr-[10px]">
              Explore Routes
            </span>
            <MagnifyingGlassIcon className="md:w-[64px] sm:w-[52px] w-[32.45px] rotate-90 stroke-2" />
          </div>
          <div>
            <Filter routeOption={routeOption} setRouteOption={setRouteOption} />
            <div className="Cards grid computer:grid-cols-3 gap-4 z-0 sm:my-[23px] my-[18px] phone:grid-cols-1 tablet:grid-cols-2">
              {routes.length > 0 ?
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
                      isLiked={route.routeInfo.LikedUsers.includes(username)}
                      isFavourited={route.routeInfo.FavouritedUsers.includes(
                        username
                      )}
                      routeGeom={route.routeInfo.Geometry}
                      duration={route.routeInfo.Duration}
                    />
                  );
                }) : loadingRoutes && <RouteCardLoadingSet />
              }
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
