import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { useStateValue } from '../state';

const DEFAULT_CENTER = { lat: 37.787653, lng: -122.420211 };
const DEFAULT_ZOOM = 10;

const Map = ({ history, parkingList, zoom }) => {
  const openParkingDetails = parkingID => history.push(`/parking/${parkingID}`);

  return (
    <GoogleMap defaultZoom={DEFAULT_ZOOM} defaultCenter={DEFAULT_CENTER} zoom={zoom}>
      {parkingList.map(parking => (
        <Marker
          title={parking.title}
          key={parking.parkingID}
          position={{
            lat: parking.location.latitude,
            lng: parking.location.longitude
          }}
          onClick={() => openParkingDetails(parking.parkingID)}
        />
      ))}
    </GoogleMap>
  );
};

const MapWrapped = withScriptjs(withGoogleMap(Map));

const ContainerElement = <div style={{ height: '100%' }} />;

const ParkingMap = props => {
  const [
    {
      parkingList: { loading, items }
    }
  ] = useStateValue();

  return (
    <div style={{ flex: '1 0' }}>
      <MapWrapped
        {...props}
        parkingList={items}
        zoom={loading ? 15 : 17}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`}
        loadingElement={ContainerElement}
        containerElement={ContainerElement}
        mapElement={ContainerElement}
      />
    </div>
  );
};

export default ParkingMap;
