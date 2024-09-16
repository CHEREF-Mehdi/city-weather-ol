import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import pin from '../../assets/pin.png';
import { cities, getCoordinate } from '../../helpers/cities';

interface MapProps {
  selectedCity?: string;
}

const MapComponent: React.FC<MapProps> = ({ selectedCity }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>(
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([2.35, 48.86]),
        zoom: 6,
      }),
    })
  );

  useEffect(() => {
    if (mapRef.current) {
      map.setTarget(mapRef.current);
      const vectorSource = new VectorSource();

      Object.entries(cities).forEach(([city, [lon, lat]]) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          name: city,
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: pin,
              scale: 0.2,
            }),
          })
        );

        vectorSource.addFeature(feature);
      });

      map.addLayer(
        new VectorLayer({
          source: vectorSource,
        })
      );

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
    if (selectedCity) {
      map.setView(
        new View({
          center: fromLonLat(getCoordinate(selectedCity)),
          zoom: 12,
        })
      );
    } else {
      map.setView(
        new View({
          center: fromLonLat([2.35, 48.86]),
          zoom: 6,
        })
      );
    }
  }, [selectedCity]);

  return <div ref={mapRef} style={{ width: '80%', height: '90%' }} />;
};

export default MapComponent;
