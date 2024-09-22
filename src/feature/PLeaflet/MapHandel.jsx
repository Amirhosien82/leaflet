import { useEffect, useState } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import IRAN from "../../data/iran";
import CenterIran from "../../data/centerIran";
function MapHandel() {
  const map = useMap();
  const [isClick, setIsClick] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    map.on("zoomend", () => {
      if (map.getZoom() < 9) {
        setIsClick(false);
      } else {
        setIsClick(true);
        setName("");
      }
    });
  }, [map]);

  function pointToLayer(feature, latlng) {
    return L.marker(latlng).bindTooltip(`<h3>${feature.properties.name}</h3>`);
  }

  return (
    <>
      <GeoJSON
        data={IRAN}
        pathOptions={{ color: "grey", weight: 2 }}
        eventHandlers={{
          mouseover: (feature) => {
            if (map.getZoom() < 9)
              setName(feature.layer.feature.properties.NAME_1);
          },
        }}
        style={(feature) => {
          return {
            fillColor: name === feature.properties.NAME_1 && "greey",
            fillOpacity: name === feature.properties.NAME_1 ? 0.2 : 0,
          };
        }}
      />
      {isClick || (
        <GeoJSON
          pointToLayer={pointToLayer}
          data={CenterIran}
          eventHandlers={{
            click: (event) => {
              setIsClick(true);
              setName("");
              map.flyTo(
                [
                  event.layer.feature.geometry.coordinates.at(1),
                  event.layer.feature.geometry.coordinates.at(0),
                ],
                12
              );
            },
          }}
        ></GeoJSON>
      )}
    </>
  );
}

export default MapHandel;
