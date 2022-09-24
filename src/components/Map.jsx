import React from 'react'
import GoogleMapReact from 'google-map-react'
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ location }) => {
  const defaultProps = {
    center: {
      lat: 1.363675,
      lng: 103.808922
    },
    zoom: 12
  };

  return (
    <div className='h-full w-full'>
      <GoogleMapReact
        bootstrapURLKeys={{key: ""}} // insert API key here
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
}

export default Map
