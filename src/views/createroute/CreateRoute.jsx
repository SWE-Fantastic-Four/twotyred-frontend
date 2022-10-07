import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';
import { urls } from '../../constants/constants';
import { capitalise } from '../../utils/string';
import GreenButton from './GreenButton';

const CreateRoute = () => {
  const [selection, setSelection] = useState(2); // 0 is selecting start point, 1 is selecting intermediate points
  // const [start, setStart] = useState({ name: "asndjkasndjsakdlansdj" });
  // const [places, setPlace] = useState([{ name: "dnsjakdnjsakdnsaddsjakndjsakdnasjkdnsajdkasdnjka"}]);
  const [start, setStart] = useState(null);
  const [places, setPlaces] = useState([]);

  const removeItem = (index) => {
    setPlaces(places.filter((o, i) => index !== i));
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
      if (places.length >= 4) {
        throw new Error("Too many places selected.");
      }
      const revGeoResponse = await fetch(urls.backend + "/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({lat, lng})
      });
      const resJSON = await revGeoResponse.json();
      const address = capitalise(resJSON.address);
      const newPlace = {
        id: `${lat},${lng}`,
        name: address,
        lat,
        lng
      }
      if (selection === 0) {
        setStart(newPlace);
      } else {
        setPlaces([...places, newPlace]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <div className="sm:h-[calc(100vh-98px)] h-[calc(100vh-53px)] w-screen relative">
        <div className={`font-medium p-[10px] text-[32px] z-10 absolute ${start === null ? "" : "sm:h-full"} w-full sm:w-auto`}>
          <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} start={start} selection={selection} />
        </div>
        {places.length > 0 && <GreenButton className="absolute bottom-0 right-0 z-10 m-[10px] flex sm:hidden">Generate Route</GreenButton>}
        <div className="h-full w-full">
          <Map location={location} onClick={clickHandler} places={places} start={start} options={{disableDefaultUI: true}}/>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
