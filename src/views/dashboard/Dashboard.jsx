import React from 'react'
import MainLayout from '../../layout/MainLayout';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RouteCard from '../../components/RouteCard';
import Filter from '../../components/Filter';
const Dashboard = () => {

  return (
    <MainLayout>
      <div className="max-w-[var(--max-screen-width)] w-full sm:px-[106px] px-[16px]">
        <div className="mt-[47px] flex flex-col">
          <span className="font-bold md:text-[64px] sm:text-[52px] text-[32px] mr-[10px]">Explore Routes</span>
          <MagnifyingGlassIcon className="md:w-[64px] sm:w-[52px] w-[32.45px] rotate-90 stroke-2" />
          <div>
            <Filter/>
            <div className='Cards grid grid-cols-3 gap-4 z-0'>
              <div className='grid-item'>
                <RouteCard />
              </div>
              <div className='grid-item'>
                <RouteCard />
              </div>
              <div className='grid-item'>
                <RouteCard />
              </div>
              <div className='grid-item'>
                <RouteCard />
              </div>
            </div>            
          </div>

        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard;
