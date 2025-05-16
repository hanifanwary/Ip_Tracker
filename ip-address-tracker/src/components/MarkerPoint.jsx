import { Icon } from 'leaflet';
import { useEffect } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';

function MarkerPoint({ adress }) {
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3179/3179068.png',
    iconSize: [40, 40],
  });
  const position = [adress.latitude, adress.longitude];
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <>
      <Marker position={position} icon={customIcon}>
        <Popup>IP Address Location</Popup>
      </Marker>
    </>
  );
}

export default MarkerPoint;