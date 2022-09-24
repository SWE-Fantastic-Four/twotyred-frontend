import React from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';

const CreateRoute = () => {
  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }
  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen">
        <Map location={location} />
      </div>
    </MainLayout>
  )
}

export default CreateRoute
