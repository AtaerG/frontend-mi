import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = "38.536160";
  long = "-0.181999";
  zoom = 6;
  coord:number[] = [Number(this.long), Number(this.lat)];
  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.181999, 38.536160],
      zoom: 6
  });
  this.map.addControl(new mapboxgl.NavigationControl());
  this.map.addControl(new mapboxgl.FullscreenControl());

  const geojson = {
      type: 'FeatureCollection',
      features: [{
          type: 'Feature',
          geometry: {
              type: 'Point',
          },
          properties: {
              title: 'MI',
              description: 'Estamos aqui!'
          }
      }]
  };

  this.map.on('load', () => {
      this.map.flyTo({
          center: [
              parseFloat(this.long),
              parseFloat(this.lat)
          ],
          essential: true,
          zoom: 15
      });
      for (const feature of geojson.features) {
          const el = document.createElement('div');
          el.className = 'marker';
          new mapboxgl.Marker(el).setLngLat(this.coord)
              .setPopup(
                  new mapboxgl.Popup({ offset: 1 }).setHTML(
                      '<div class="text-primary text-center"><p>Si quiere visitarnos, estamos aqui:</p><p>C/Campello, 1 nave 12. Polígono La Cala</p><p>03509 Finestrat, Alicante, España</p></div>'
                  )
              )
              .addTo(this.map);
      }
  });
  return this.map;
}
}
