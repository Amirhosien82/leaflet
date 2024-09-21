import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import MapHandel from "../feature/PLeaflet/MapHandel";

function Pleaflet() {
  const position = [32.30910377510498, 55.57374690686764];
  return (
    <MapContainer
      center={position}
      zoom={6}
      minZoom={6}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
      maxBounds={[
        [39.83537747494472, 44.04182386913732],
        [25.02476640292126, 62.230072841034826],
      ]}
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Osm">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="HOT">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MapHandel />
    </MapContainer>
  );
}



export default Pleaflet;
