import React, { useState, useEffect, useRef } from 'react'
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
import Star from "../../assets/star.svg";
import { AnimatePresence, motion } from 'framer-motion';

const CreateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selection, setSelection] = useState(-1); // 0 is selecting start point, 1 is selecting intermediate points

  const [start, setStart] = useState(null);
  const [places, setPlaces] = useState([]);
  const [routeGeom, setRouteGeom] = useState("");
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeDuration, setRouteDuration] = useState(0);
  const [alerts, setAlerts] = useState([]); // [0,1,2] 0 = "Route successfully saved!", 1 = "New route created!", 2 = "Error: failed to generate route"

  const [distanceInput, setDistanceInput] = useState("");
  const [mobileDrawerShrunk, setMobileDrawerShrunk] = useState(true);
  const [mapCenter, setMapCenter] = useState({lat: 1.363675, lng: 103.808922});
  const username = useSelector(state => state.auth.displayName);

  const ref = useRef(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page"); // "0" is RouteSelection page, "1" is RouteDescription page
  const mode = searchParams.get("mode");

  const [height, setHeight] = useState(0);
  
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

  useEffect(() => {
    const resetViewHeight = () => {
      let vh = window.innerHeight * 0.01;
      if (ref) {
        if (ref.current.clientWidth < 640) {
          setHeight(100 * vh - 53);
        } else {
          setHeight(100 * vh - 98);
        }
      }
    }

    window.addEventListener('resize', resetViewHeight);
    return () => {
      window.removeEventListener('resize', resetViewHeight);
    }
  },[ref]);

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
    try {
      let routeGeom;
      let routeDistance;
      let routeDuration;
      if (mode === "default") {
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
        routeGeom = route.route_geometry;
        routeDistance = route.distance;
        routeDuration = route.duration;
      } else {
        if (isNaN(distanceInput)) {
          throw new Error("Input not numeric");
        }
        const options = {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            starting_lat: start.lat,
            starting_lng: start.lng,
            target_dist: distanceInput
          })
        }
        const planRouteRes = await fetch(urls.lucky, options);
        const route = await planRouteRes.json();
        console.log(route);
        routeGeom = route.route_geom;
        routeDistance = route.distance;
        routeDuration = 0; // TODO: CHANGE THIS ACC TO API
        const endPt = route.end_pt;
        endPt.id = `${endPt.lat},${endPt.lng}`;
        endPt.name = endPt.pt_address;
        delete endPt.pt_address;
        setPlaces([endPt]);
      }
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
      setAlerts([...alerts,1]);
      setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
      }, 5000);
    } catch (error) {
      // TODO: error handling
      console.error(error.message);
      setAlerts([...alerts,2]);
      setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
      }, 5000);
    }
  }

  const saveRouteHandler = async(e) => {
    e.stopPropagation();
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
          intermediatePts: mode === "default" ? places : [],
          startPt: start,
          endPt: places[places.length - 1]
        })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      setAlerts([...alerts,0]);
      setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.slice(1));
      }, 5000);
    } catch (error) {
      // TODO: go to error page
      console.error(error.message);
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

  const displayAlert = () => {
    return alerts.map((alert, i) => {
      switch (alert) {
        case 0:
          if (page === "1") {
            return (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="sm:h-[43px] h-[34px] sm:w-[250px] w-[213px] bg-white rounded-[10px] text-black text-center flex items-center justify-center shadow-lg">
                Route successfully saved!
              </motion.div>          
            )
          } else return;

        case 1:
          if (page === "1") {
            return (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1}} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="sm:h-[43px] h-[34px] sm:w-[250px] w-[213px] bg-white rounded-[10px] text-black py-[6px] flex items-center sm:pl-[11px] pl-[14px] shadow-lg">
                <img src={Star} className="sm:w-[31px] w-[26px]" />
                <p className="sm:ml-[19px] ml-[24px]">New route created!</p>
              </motion.div>
            )
          } else return;

        case 2:
          if (page === "0") {
            return (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="sm:flex h-[43px] hidden items-center px-[28px] rounded-[10px] bg-[#EACDCD] text-[#AE3213] shadow-lg">
                Error: Failed to generate route
              </motion.div>
            )
          } else return;
      }
    });
  }

  return (
    <MainLayout>
      {/* w-screen */}
      <div style={{ height }} className="w-full relative" ref={ref}>
        {displayPage()}
        <div className="absolute z-10 sm:right-0 sm:left-auto left-0 top-0 sm:mt-[11px] mt-[8px] sm:mr-[20px] ml-[10px] flex flex-col gap-[10px] font-medium sm:text-[20px] text-[16px] sm:items-end items-start">
          <AnimatePresence>
            {displayAlert()}
          </AnimatePresence>
        </div>
        {/* <div>
          {page === "0" && places.length > 0 && alerts.filter(alert => alert === 2).length > 0 && <div>Fuck</div>}
        </div> */}
        {places.length > 0 && page === "0" && 
          <div className="absolute bottom-0 right-0 z-10 m-[10px] flex flex-col sm:hidden gap-[12px] items-end">
            {alerts.filter(alert => alert === 2).length > 0 && alerts.filter(alert => alert === 2).map((_,i) => <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex h-[39px] items-center px-[28px] rounded-[10px] bg-[#EACDCD] text-[#AE3213] text-[18px] shadow-lg font-medium">
              Error: Failed to generate route
            </motion.div>)
            }
            <GreenButton className="w-[175px]" onClick={generateHandler}>Generate Route</GreenButton>
          </div>
        }
        <div className="h-full w-full">
          <Map onClick={clickHandler} places={places} start={start} options={{disableDefaultUI: true}} routeGeom={page === "1" ? routeGeom : ""} center={mapCenter} />
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateRoute
