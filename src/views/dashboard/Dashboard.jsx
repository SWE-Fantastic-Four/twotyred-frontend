import React from 'react'
import MainLayout from '../../layout/MainLayout';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RouteCard from '../../components/RouteCard';
const Dashboard = () => {

  return (
    <MainLayout>
      <div className="w-[var(--max-screen-width)] px-[106px]">
        <div className="mt-[47px] flex">
          <span className="font-bold md:text-[64px] sm:text-[52px] text-[32px] mr-[10px]">Explore Routes</span>
          <MagnifyingGlassIcon className="md:w-[64px] sm:w-[52px] w-[32.45px] rotate-90 stroke-2" />
          <RouteCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard;
