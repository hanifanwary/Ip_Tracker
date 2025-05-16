import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerPoint from './MarkerPoint';

const Map = ({ adress }) => (
  <MapContainer
    center={[adress.latitude, adress.longitude]}
    zoom={13}
    className="h-screen"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <MarkerPoint adress={adress} />
  </MapContainer>
);

export default Map;