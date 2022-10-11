import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';

const CreateRoute = () => {
  const [page, setPage] = useState(0); // 0 is RouteSelection page, 1 is RouteDescription page
  const [selection, setSelection] = useState(0); // 0 is selecting start point, 1 is selecting intermediate points
  const [alert, setAlert] = useState(0);
  const [start, setStart] = useState({
    id: "1.29306,103.856",
    name: "Taman Jurong Food Centre",
    lat: 1.29306,
    lng: 103.856
  });

  const [places, setPlace] = useState([{
    id: "1.3359,103.7262",
    name: 'Jurong Lake Gardens',
    lat: 1.3359,
    lng: 103.7262
  }, {
    id: "1.3457,103.7131",
    name: 'Boon Lay Place Market',
    lat: 1.3457,
    lng: 103.7131
  }])

  const removeItem = (index) => {
    setPlace(places.filter((o, i) => index !== i));
  };

  const location = {
    address: '1600=Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  const clickHandler = (e) => {
    const { lat, lng } = e;
    const newPlace = {
      id: `${lat},${lng}`,
      name: "Placeholder place",
      lat,
      lng
    }
    if (selection === 0) {
      setStart(newPlace);
    } else {
      setPlace([...places, newPlace]);
    }
  }

  const displayPage = () => {
    switch (page) {
      case 0:
        return <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} setPage={setPage} />
      
      case 1:
        return <RouteDescription setPage={setPage} setAlert={setAlert}/>
    }
  }

  const displayAlert = () => {
    switch (alert) {
      case 1:
        return (
          <div className="absolute z-10 right-0 top-0 h-[43px] w-[250px] bg-white rounded-[10px] mt-[8px] mr-[20px] text-black text-[20px] text-center py-[7px] font-bold">
            Route successfully saved!
          </div>          
        )
    }
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen relative">
        <div className="text-red-300 font-bold text-[32px] z-10 absolute">
          {displayPage()}
        </div>
        {displayAlert()}
        <div className="h-full w-full">
          <Map location={location} onClick={clickHandler} places={places} start={start} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
