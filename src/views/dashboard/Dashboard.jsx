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
          <div className='headers flex'>
          <span className="font-bold md:text-[64px] sm:text-[52px] text-[32px] mr-[10px]">Explore Routes</span>
          <MagnifyingGlassIcon className="md:w-[64px] sm:w-[52px] w-[32.45px] rotate-90 stroke-2" />
          </div>

          <div className='everything else'>
            <Filter/>
            <div className='Cards grid computer:grid-cols-3 gap-4 z-0 mt-[10px] phone:grid-cols-1 tablet:grid-cols-2'>
              <div>
                <RouteCard className='z-0'likeCount={123901} />
              </div>
              <div>
                <RouteCard likeCount={123901} />
              </div>
              <div>
                <RouteCard likeCount={123901} />
              </div>
              <div>
                <RouteCard likeCount={123901} />
              </div>
            </div>            
          </div>

        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard;
