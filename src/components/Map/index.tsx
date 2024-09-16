import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import {
  cities,
  getCityFromDepartement,
  getCoordinate,
  parisCoordinate,
} from '../../helpers/cities';
import { GeoJSON } from 'ol/format';

interface MapProps {
  selectedCity?: string;
  setSetectedCity: (city?: string) => void;
}

const MapComponent: React.FC<MapProps> = ({
  selectedCity,
  setSetectedCity,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map] = useState<Map>(
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(parisCoordinate),
        zoom: 6,
      }),
    })
  );

  useEffect(() => {
    if (mapRef.current) {
      map.setTarget(mapRef.current);

      Object.entries(cities).forEach(([_, { geojsonUrl }]) => {
        map.addLayer(
          new VectorLayer({
            source: new VectorSource({
              url: geojsonUrl,
              format: new GeoJSON(),
            }),
            style: new Style({
              stroke: new Stroke({
                color: 'blue',
                width: 2,
              }),
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)',
              }),
            }),
          })
        );
      });

      map.on('click', function (event) {
        map.forEachFeatureAtPixel(event.pixel, function (feature) {
          const city = getCityFromDepartement(feature.getProperties().nom);
          setSetectedCity(city);
        });
      });

      const handleResize = () => {
        map.updateSize();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    // zoom in/out from a selected city
    if (selectedCity) {
      map.setView(
        new View({
          center: fromLonLat(getCoordinate(selectedCity)),
          zoom: 12, // zoom in if a city is selected
        })
      );
    } else {
      map.setView(
        new View({
          center: fromLonLat(parisCoordinate),
          zoom: 6, // zoom out if not
        })
      );
    }
  }, [selectedCity]);

  return <div ref={mapRef} style={{ width: '80%', height: '90%' }} />;
};

export default MapComponent;
