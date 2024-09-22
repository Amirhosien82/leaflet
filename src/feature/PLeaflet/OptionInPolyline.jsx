import styled from "styled-components";
import { useEffect, useState } from "react";
import centerIran from "../../data/centerIran";
import { Polyline, useMap } from "react-leaflet";
import axios from "axios";
const Container = styled.div`
  position: absolute;
  border: 1px solid #c2c2c2;
  background-color: #fff;
  right: 10px;
  left: 10px;
  bottom: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  z-index: 1000;

  @media (min-width: 650px) {
    width: 270px;
    left: initial;
    bottom: initial;
    right: 10px;
    top: 100px;
    padding: 15px;
    gap: 15px;
  }
`;

const SelectStyle = styled.select`
  margin: 0;
  width: 100%;
  padding: 2px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  color: #343434;
  font-size: 15px;
  max-height: 100px;
  outline: 0;

  @media (min-width: 650px) {
    padding: 5px;
  }
`;

const TitleContainer = styled.div`
  padding: 0;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`

font-size: 12px;
@media (min-width: 650px) {
  font-size: 16px;
  }

`;

const OptionStyle = styled.option``;

function OptionInPolyline() {
  const [selection, setSelection] = useState({});
  const [dataInPolyline, setDataInPolyline] = useState({});
  const [loading, setLoading] = useState(false);
  const map = useMap();

  function onChange(e, index) {
    const coordinates = e.target.value;
    setSelection((s) => {
      const newSelection = { ...s, [index]: coordinates };

      return newSelection;
    });
  }

  useEffect(() => {
    function createPolyline(newSelection) {
      let dataPolyline = [];

      for (const i in newSelection) {
        dataPolyline = [...dataPolyline, newSelection[i].split(",")];
      }

      dataPolyline = dataPolyline.map((item) => [
        Number(item.at(1)),
        Number(item.at(0)),
      ]);

      axios
        .get(
          `https://router.project-osrm.org/route/v1/driving/${dataPolyline
            .at(0)
            .at(1)},${dataPolyline.at(0).at(0)};${dataPolyline
            .at(1)
            .at(1)},${dataPolyline
            .at(1)
            .at(0)}?overview=full&geometries=geojson`
        )
        .then((res) => {
          const polyLineData = res.data.routes[0].geometry.coordinates.map(
            (i) => [i.at(1), i.at(0)]
          );

          const distance = res.data.routes[0].distance;
          let time = res.data.routes[0].duration;
          console.log(time);

          const h = Math.floor(time / 3600);
          time = time - h * 3600;
          const m = Math.floor(time / 60);

          const duration = `${h} : ${m}`;

          setDataInPolyline({ polyLineData, distance, duration });
          map.flyToBounds(dataPolyline);
        });
    }

    if (selection[0] && selection[1]) {
      setLoading(true);
      createPolyline(selection);
      setLoading(false);
    }
  }, [map, selection]);

  const data = centerIran.features.map((item) => item);

  return (
    <>
      {dataInPolyline.polyLineData && (
        <Polyline
          positions={dataInPolyline.polyLineData}
          pathOptions={{ weight: 5 }}
        />
      )}
      <Container>
        <SelectStyle onChange={(e) => onChange(e, 0)}>
          <OptionStyle selected disabled>
            Please select an option
          </OptionStyle>
          {data.map((item) => (
            <OptionStyle
              value={item.geometry.coordinates}
              key={item.properties.name}
              disabled={
                selection[1] ===
                `${item.geometry.coordinates.at(
                  0
                )},${item.geometry.coordinates.at(1)}`
              }
            >
              {item.properties.name}
            </OptionStyle>
          ))}
        </SelectStyle>
        <SelectStyle draggable={true} onChange={(e) => onChange(e, 1)}>
          <OptionStyle selected disabled>
            Please select an option
          </OptionStyle>
          {data.map((item) => (
            <OptionStyle
              value={item.geometry.coordinates}
              key={item.properties.name}
              disabled={
                selection[0] ===
                `${item.geometry.coordinates.at(
                  0
                )},${item.geometry.coordinates.at(1)}`
              }
            >
              {item.properties.name}
            </OptionStyle>
          ))}
        </SelectStyle>

        <TitleContainer>
          <Title>
            KM : {Number(dataInPolyline.distance / 1000 || 0).toFixed(0)}
          </Title>
          <Title>TIME : {dataInPolyline.duration || "0:0"}</Title>
        </TitleContainer>
      </Container>
    </>
  );
}

export default OptionInPolyline;
