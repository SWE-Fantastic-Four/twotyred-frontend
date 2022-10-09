import React, { useCallback, useState } from 'react'
// import GoogleMapReact from 'google-map-react'
import IntermediateMarker from "../assets/Marker.svg";
import StartMarker from "../assets/StartMarker.svg";
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useMemo } from 'react';
import { useEffect } from 'react';

const Map = ({ options, onClick, places, start, routePoints }) => {
  const zoom = 12;
  const center = {lat: 1.363675, lng: 103.808922}
  const apiKey = import.meta.env.VITE_MAPS_APIKEY === undefined ? "" : import.meta.env.VITE_MAPS_APIKEY;
  const onLoad = useCallback((map) => {
    setMap(map);
  }, [])

  // routePoints = [
  //   { lat: 1.3007, lng: 103.8550 },
  //   { lat: 1.2907, lng: 103.8517 },
  //   { lat: 1.2878, lng: 103.8666 }
  // ];

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const mapElement = useMemo(() => (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%"
      }}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      {routePoints && <Polyline path={routePoints} options={{ strokeColor: "#E50027" }} />}
      {start && <Marker icon={StartMarker} position={{lat: start.lat, lng: start.lng}} className="-translate-x-1/2 -translate-y-1/2" />}
      {places && places.map(place => <Marker icon={IntermediateMarker} key={place.id} position={{lat: place.lat, lng: place.lng}} />)}
    </GoogleMap>
  ),[places, start, onClick]);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && window.google && start) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(start.lat, start.lng));
      places.forEach(place => {
        bounds.extend(new window.google.maps.LatLng(place.lat, place.lng));
      });
      map.fitBounds(bounds);
      map.setZoom(zoom);
    }
  },[places, start]);

  return (
    <div className='h-full w-full'>
      <LoadScript googleMapsApiKey={apiKey}>
        {mapElement}
      </LoadScript>
      {/* <GoogleMapReact
        bootstrapURLKeys={{key: apiKey}} // insert API key here
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={options}
        onClick={onClick}
      >
        {start && <img src={StartMarker} lat={start.lat} lng={start.lng} className="-translate-x-1/2 -translate-y-1/2" />}
        {places && places.map(place => <img key={place.id} src={Marker} lat={place.lat} lng={place.lng} className="-translate-x-1/2 -translate-y-full" />)}
      </GoogleMapReact> */}
    </div>
  );
}

export default Map
