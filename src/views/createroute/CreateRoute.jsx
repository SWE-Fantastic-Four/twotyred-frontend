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
  const [page, setPage] = useState(0); // 0 is RouteSelection page, 1 is RouteDescription page
  // const [start, setStart] = useState({
  //   id: "1.29306,103.856",
  //   name: "Taman Jurong Food Centre",
  //   lat: 1.29306,
  //   lng: 103.856
  // });

  // const [places, setPlace] = useState([{
  //   id: "1.3359,103.7262",
  //   name: 'Jurong Lake Gardens',
  //   lat: 1.3359,
  //   lng: 103.7262
  // }, {
  //   id: "1.3457,103.7131",
  //   name: 'Boon Lay Place Market',
  //   lat: 1.3457,
  //   lng: 103.7131
  // }])
  const [routeGeom, setRouteGeom] = useState(null)

  const removeItem = (index) => {
    setPlaces(places.filter((o, i) => index !== i));
  };
  


  const generateRoute = async() => {
    let allPlaces = [start,...places];
    const coordinates = allPlaces.map((place) => `${place.lat},${place.lng}`);
    const options = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({'chosenLocations':coordinates})
    };
    const planRouteRes = await fetch("https://SWE-Backend.chayhuixiang.repl.co/planroute", options);
    const route = await planRouteRes.json()
    setRouteGeom(route); 
  }

  const location = {
    address: '1600=Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

  const clickHandler = async(e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(lat, lng, selection, places);
    try {
      if (places.length >= 4) {
        throw new Error("Too many places selected.");
      } else if (selection === 0 || selection === 1) {
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
        } else if (selection === 1) {
          setPlaces([...places, newPlace]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const displayPage = () => {
    switch (page) {
      case 0:
        return <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} setPage={setPage} generateRoute={generateRoute} selection={selection} start={start} />
      
      case 1:
        return <RouteDescription setPage={setPage}/>
    }
  }

  return (
    <MainLayout>
      <div className="sm:h-[calc(100vh-98px)] h-[calc(100vh-53px)] w-screen relative">
        <div className={`font-medium p-[10px] text-[32px] z-10 absolute ${start === null ? "" : "sm:h-full"} w-full sm:w-auto`}>
          {displayPage()}
        </div>
        {places.length > 0 && <GreenButton className="absolute bottom-0 right-0 z-10 m-[10px] flex sm:hidden">Generate Route</GreenButton>}
        <div className="h-full w-full">
          <Map location={location} onClick={clickHandler} places={places} start={start} options={{disableDefaultUI: true}} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
