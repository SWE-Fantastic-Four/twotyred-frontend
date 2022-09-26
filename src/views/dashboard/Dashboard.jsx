import React from 'react'
import MainLayout from '../../layout/MainLayout';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {

  return (
    <MainLayout>
      <div className="w-[var(--max-screen-width)] px-[106px]">
        <div className="mt-[47px] flex">
          <span className="font-bold text-[64px] mr-[10px]">Explore Routes</span>
          <MagnifyingGlassIcon className="w-[64px] rotate-90 stroke-2" />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard;
