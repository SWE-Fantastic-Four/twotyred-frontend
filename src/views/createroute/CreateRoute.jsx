import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';
import { urls } from '../../constants/constants';
import { capitalise } from '../../utils/string';

const CreateRoute = () => {
  const [selection, setSelection] = useState(0); // 0 is selecting start point, 1 is selecting intermediate points
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

  const clickHandler = async(e) => {
    try {
      const { lat, lng } = e;
      console.log(lat, lng);
      const revGeoResponse = await fetch(urls.backend + "/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({lat, lng})
      });
      console.log(revGeoResponse);
      const resJSON = await revGeoResponse.json();
      const address = capitalise(resJSON.address);
      console.log(address);
      const newPlace = {
        id: `${lat},${lng}`,
        name: address,
        lat,
        lng
      }
      if (selection === 0) {
        setStart(newPlace);
      } else {
        setPlace([...places, newPlace]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-98px)] w-screen relative">
        <div className="text-red-300 font-bold text-[32px] z-10 absolute">
          <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} start={start} />
        </div>
        <div className="h-full w-full">
          <Map location={location} onClick={clickHandler} places={places} start={start} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
