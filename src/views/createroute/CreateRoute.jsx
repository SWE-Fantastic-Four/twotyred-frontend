import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';
import { urls } from '../../constants/constants';
import { capitalise } from '../../utils/string';
import GreenButton from './GreenButton';
import polyUtil from "polyline-encoded";
import { useLocation } from 'react-router-dom';

const CreateRoute = () => {
  const [selection, setSelection] = useState(2); // 0 is selecting start point, 1 is selecting intermediate points
  const [start, setStart] = useState(null);
  const [places, setPlaces] = useState([]);
  const [distanceInput, setDistanceInput] = useState("");
  const [page, setPage] = useState(0); // 0 is RouteSelection page, 1 is RouteDescription page
  const [mapCenter, setMapCenter] = useState({lat: 1.363675, lng: 103.808922});
  const location = useLocation();
  const mode = location.state === undefined || location.state.mode === "default" ? 'default' : 'lucky';
  const [routePoints, setRoutePoints] = useState([])

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
    const planRouteRes = await fetch( urls.backend + "/planroute", options);
    const route = await planRouteRes.json()
    const decoded = route.route_geometry;
    const latlngs = polyUtil.decode(decoded, {
      precision: 5
    });
    const routePoints = latlngs.map((latlng) => {
      return { lat: latlng[0], lng: latlng[1] }
    })
    setRoutePoints(routePoints); 
  }

  const clickHandler = async(e, map) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const centerLat = map.center.lat();
    const centerLng = map.center.lng();
    console.log(lat, lng, selection);
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
        setMapCenter({ lat: centerLat, lng: centerLng });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const generateHandler = async () =>{
    await generateRoute();
    setPage(1);
  }

  const displayPage = () => {
    switch (page) {
      case 0:
        return (
          <div className={`font-medium p-[10px] z-10 absolute ${start === null ? "" : "sm:h-full"} w-full sm:w-auto`}>
            <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} onGenerate={generateHandler} selection={selection} start={start} mode={mode} distanceInput={distanceInput} setDistanceInput={setDistanceInput} />
          </div>
        );

      case 1:
        return (
          <div className={`font-medium sm:p-[10px] text-[32px] z-10 absolute h-full w-full sm:w-auto overflow-hidden`}>
            <RouteDescription setPage={setPage} />
          </div>
        )
    }
  }

  return (
    <MainLayout>
      <div className="sm:h-[calc(100vh-98px)] h-[calc(100vh-53px)] w-screen relative">
        {displayPage()}
        {places.length > 0 && page === 0 && <GreenButton className="absolute bottom-0 right-0 z-10 m-[10px] flex sm:hidden" onClick={generateHandler}>Generate Route</GreenButton>}
        <div className="h-full w-full">
          <Map onClick={clickHandler} places={places} start={start} options={{disableDefaultUI: true}} routePoints={page === 1 ? routePoints : []} center={mapCenter} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
