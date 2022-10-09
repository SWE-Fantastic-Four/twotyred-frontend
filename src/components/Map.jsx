import React, { useState } from 'react'
// import GoogleMapReact from 'google-map-react'
import IntermediateMarker from "../assets/Marker.svg";
import StartMarker from "../assets/StartMarker.svg";
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import { useMemo } from 'react';
import { useEffect } from 'react';

const Map = ({ options, onClick, places, start, routePoints, center }) => {
  const zoom = 12;
  const apiKey = import.meta.env.VITE_MAPS_APIKEY === undefined ? "" : import.meta.env.VITE_MAPS_APIKEY;

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && window.google && start && !center) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(start.lat, start.lng));
      places.forEach(place => {
        bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
      });
      map.fitBounds(bounds);
      // map.setZoom(zoom);
    }
  },[]);

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
