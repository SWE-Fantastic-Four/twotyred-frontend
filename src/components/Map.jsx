import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import polyUtil from 'polyline-encoded';
import React, { useEffect, useState } from 'react';
import IntermediateMarker from "../assets/Marker.svg";
import StartMarker from "../assets/StartMarker.svg";

const Map = ({ options, onClick, places, start, routeGeom="", center }) => {
  const zoom = 12;
  const apiKey = import.meta.env.VITE_MAPS_APIKEY === undefined ? "" : import.meta.env.VITE_MAPS_APIKEY;
  const latlngs = polyUtil.decode(routeGeom, {
    precision: 5
  });
  const routePoints = latlngs.map((latlng) => {
    return { lat: latlng[0], lng: latlng[1] }
  })
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && window.google && !center) {
      const bounds = new window.google.maps.LatLngBounds();
      routePoints.forEach((routePoint) => {
        bounds.extend(new window.google.maps.LatLng(routePoint.lat, routePoint.lng));
      })
      map.fitBounds(bounds);
    }
  },[map]);

  return (
    <div className='h-full w-full'>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%"
        }}
          center={center}
          zoom={zoom}
          options={options}
          onLoad={(map) => setMap(map)}
          onUnmount={() => setMap(null)}
          onClick={(e) => onClick(e, map)}
        >
          {routePoints && <Polyline path={routePoints} options={{ strokeColor: "#E50027" }} />}
          {start && <Marker icon={StartMarker} position={{lat: start.lat, lng: start.lng}} />}
          {places && places.map(place => <Marker icon={IntermediateMarker} key={place.id} position={{lat: place.lat, lng: place.lng}} />)}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map
