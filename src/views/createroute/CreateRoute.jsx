import React, { useState, useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import Map from '../../components/Map';
import RouteDescription from './RouteDescription';
import RouteSelection from './RouteSelection';
import { urls } from '../../constants/constants';
import { capitalise } from '../../utils/string';
import GreenButton from './GreenButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import P from '../../constants/paths';
import { useSelector } from 'react-redux';

const CreateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selection, setSelection] = useState(-1); // 0 is selecting start point, 1 is selecting intermediate points

  const [start, setStart] = useState(null);
  const [places, setPlaces] = useState([]);
  const [routeGeom, setRouteGeom] = useState("");
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeDuration, setRouteDuration] = useState(0);

  const [distanceInput, setDistanceInput] = useState("");
  const [mobileDrawerShrunk, setMobileDrawerShrunk] = useState(true);
  const [mapCenter, setMapCenter] = useState({lat: 1.363675, lng: 103.808922});
  const username = useSelector(state => state.auth.displayName);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page"); // "0" is RouteSelection page, "1" is RouteDescription page
  const mode = searchParams.get("mode");

  
  if (mode !== "default" && mode !== "lucky" && page !== "0" && page !== "1") {
    setSearchParams({mode: "default", page: "0"});
  } else if (mode !== "default" && mode !== "lucky") {
    setSearchParams({mode: "default", page: page});
  } else if (page !== "0" && page !== "1") {
    setSearchParams({mode: mode, page: "0"});
  }
  
  useEffect(() => {
    if (page === "1") {
      const routeInfo = (!location.state || !location.state.routeInfo) ? {} : location.state.routeInfo;
      console.log(routeInfo);
      if (routeInfo.routeDistance) {
        setRouteDistance(routeInfo.routeDistance);
      }
      if (routeInfo.routeDuration) {
        setRouteDuration(routeInfo.routeDuration);
      }
      if (routeInfo.routeGeom) {
        setRouteGeom(routeInfo.routeGeom);
      }
      if (routeInfo.start) {
        setStart(routeInfo.start);
      }
      if (routeInfo.places && routeInfo.places.length > 0) {
        setPlaces(routeInfo.places);
      }
    }
  },[page, location]);


  const removeItem = (index) => {
    setPlaces(places.filter((o, i) => index !== i));
  };

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
    let allPlaces = [start,...places];
    const coordinates = allPlaces.map((place) => `${place.lat},${place.lng}`);
    const options = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({'chosenLocations':coordinates})
    };
    const planRouteRes = await fetch(urls.backend + "/planroute", options);
    const route = await planRouteRes.json()
    const routeGeom = route.route_geometry;
    const routeDistance = route.distance;
    const routeDuration = route.duration;
    navigate(P.CREATEROUTE + `?page=1&mode=${mode}`, {
      state: {
        routeInfo: {
          routeGeom,
          routeDistance,
          routeDuration,
          start,
          places
        }
      }
    })
  }

  const saveRouteHandler = async() => {
    try {
      const response = await fetch(urls.backend + "/routes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          routeGeometry: routeGeom,
          distance: routeDistance,
          duration: routeDuration,
          likes: 0,
          intermediatePts: places,
          startPt: start,
          endPt: places[places.length - 1]
        })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      // TODO: go to error page
      console.error(error);
    }
  }

  const displayPage = () => {
    switch (page) {
      case "0":
        return (
          <div className={`font-medium p-[10px] z-10 absolute ${start === null ? "" : "sm:h-full"} w-full sm:w-auto`}>
            <RouteSelection places={places} removeItem={removeItem} setSelection={setSelection} onGenerate={generateHandler} selection={selection} start={start} mode={mode} distanceInput={distanceInput} setDistanceInput={setDistanceInput} />
          </div>
        );

      case "1":
        return (
          <div className={`font-medium sm:p-[10px] text-[32px] z-10 absolute bottom-0 ${mobileDrawerShrunk ? "h-[59px]" : "h-[414px]"} sm:h-full w-full xs:w-[480px] sm:w-auto overflow-hidden`}>
            <RouteDescription routeDistance={routeDistance} onSave={saveRouteHandler} shrinkMobileDrawer={() => setMobileDrawerShrunk(true)} expandMobileDrawer={() => setMobileDrawerShrunk(false)} />
          </div>
        )
    }
  }

  return (
    <MainLayout>
      {/* w-screen */}
      <div className="sm:h-[calc(100vh-98px)] h-[calc(100vh-53px)] w-full relative">
        {displayPage()}
        {places.length > 0 && page === "0" && <GreenButton className="absolute bottom-0 right-0 z-10 m-[10px] flex sm:hidden" onClick={generateHandler}>Generate Route</GreenButton>}
        <div className="h-full w-full">
          <Map onClick={clickHandler} places={places} start={start} options={{disableDefaultUI: true}} routeGeom={page === "1" ? routeGeom : ""} center={mapCenter} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
