import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RouteCard from '../../components/RouteCard';

const Dashboard = () => {
  const [routes, showRoutes] = useState([]);
  const [likeRoutes, showLikeRoutes] = useState([]);

  useEffect(() => {
    const obtainRoutes = async () => {
      const response = await fetch(`https://swe-backend.chayhuixiang.repl.co/routes/dashboard`);
      const data = await response.json();
      showRoutes(data.routeInfoArray);
      return data.routeInfoArray;
    }
    obtainRoutes();
  }, []);

  useEffect(() => {
    const obtainLikeRoutes = async () => {
      const response = await fetch(`https://swe-backend.chayhuixiang.repl.co/routes/dashboard?like=true`);
      const data = await response.json();
      showLikeRoutes(data.routeInfoArray);
      return data.routeInfoArray;
    }
    obtainLikeRoutes();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-[var(--max-screen-width)] w-full sm:px-[106px] px-[16px]">
        <div className="mt-[47px] flex">
          <span className="font-bold md:text-[64px] sm:text-[52px] text-[32px] mr-[10px]">Explore Routes</span>
          <MagnifyingGlassIcon className="md:w-[64px] sm:w-[52px] w-[32.45px] rotate-90 stroke-2" />
          {routes.length && routes.map((route) => {
            return (<RouteCard startPt={route.routeInfo.StartPt.name} endPt={route.routeInfo.EndPt.name} distance={route.routeInfo.Distance} timestamp={route.routeInfo.Timestamp._seconds} username={route.routeInfo.Username} likes={route.routeInfo.Likes} id={route.id} />)
          })}
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard;
