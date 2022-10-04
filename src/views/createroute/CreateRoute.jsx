import React from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';

const CreateRoute = () => {
  const location = {
    address: '1600=  Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }
  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen relative">
        <div className="text-red-300 font-bold text-[32px] z-10 absolute">
          <RouteDescription />
        </div>
        <div className="h-full w-full">
          <Map location={location} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
