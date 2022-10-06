import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from "../assets/Marker.svg";
import StartMarker from "../assets/StartMarker.svg";

const Map = ({ options, onClick, places, start }) => {
  const defaultProps = {
    center: {
      lat: 1.363675,
      lng: 103.808922
    },
    zoom: 12
  };
  const apiKey = import.meta.env.VITE_MAPS_APIKEY === undefined ? "" : import.meta.env.VITE_MAPS_APIKEY;

  return (
    <div className='h-full w-full'>
      <GoogleMapReact
        bootstrapURLKeys={{key: apiKey}} // insert API key here
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={options}
        onClick={onClick}
      >
        {start && <img src={StartMarker} lat={start.lat} lng={start.lng} />}
        {places && places.map(place => <img key={place.id} src={Marker} lat={place.lat} lng={place.lng} />)}
      </GoogleMapReact>
    </div>
  );
}

export default Map
