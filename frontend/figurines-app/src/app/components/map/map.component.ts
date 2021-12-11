import { Component, AfterViewInit, Input } from '@angular/core';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import * as mc from "leaflet.markercluster";
//import "leaflet.markercluster/dist/MarkerCluster.Default.css"; 
import * as geojson from "geojson";
import { FigurinePoint } from 'src/app/entity/figurine-point';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() showGeocoder:boolean = false;
  @Input() lat:string | undefined;
  @Input() lng:string | undefined;
  @Input() figurines: FigurinePoint[] = [];
  
  private map: any;
  geocoder:any;

  private initMap(): void {
   this.map = L.map('map', {
      //center: [  46.485412,11.4767963],
      center: [46.438832, 12.389904],
      zoom: 8
    });

    var mapbox= 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	  var openstreetmap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(mapbox, {
      id: 'mapbox/light-v9',
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if(this.lat != null && typeof this.lat != undefined){
      const nlat = Number.parseFloat(this.lat!);
      const nlng = Number.parseFloat(this.lng!);
      
      
      const customIcon = L.icon({
        iconUrl: 'assets/marker/marker-red-hole.jpg',
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20,40], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
      });
      
      const marker = L.marker([nlat, nlng],{icon: customIcon});
      
      marker.addTo(this.map);
    }
    
    
    
       //parse(data, {Point: ['lat', 'lng'], include: ['name']});

    /*if(this.showGeocoder){
      (L.Control as any).geocoder().addTo(this.map);
      this.geocoder = (L.Control as any).geocoder({
        defaultMarkGeocode: false
      })
        
      
    }*/
    this.geocoder = (L.Control as any).geocoder();

    this.geocoder.addTo(this.map);

    /*this.map.on('click',  (e:any) => {
      this.geocoder.reverse().latlng(e.latlng).run(function (error: any, result: { latlng: any; }) {
        if (error) {
          return;
        }
        alert(result.latlng)
      });*/
    
  
  }

  getCustomIcon(icon:string):L.Icon{
    const customIcon = L.icon({
      iconUrl: 'assets/marker/'+ icon,
      iconSize:     [30, 30], // size of the icon
      iconAnchor:   [15,30], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
    });
    return customIcon;


  }

  addGeoJsonFigurines() {
    

    if(this.figurines!.length > 0){
      //const markers = new L.MarkerClusterGroup();
      for(let f of this.figurines!){
        const customIcon = this.getCustomIcon(f.icon);

        const marker = L.marker([f.lat, f.lng],{icon: customIcon});
        const popupText = "<p><a href='"+f.url+"'>"+f.title+"</a><br/>"+f.location+"</p>";
        marker.bindPopup(popupText);
        //marker.addTo(markers);
        marker.addTo(this.map);
        //markers.addLayer(marker);
        
      }
      //markers.addTo(this.map);

    }
    

    /*var geoJsonFeatures: geojson.FeatureCollection = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name":"nebojsax",
            "category":"dukanovic"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              6.134490966796874,
              49.61649369617232
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name":"nebojsa",
            "category":"dukanovic"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              5.887298583984375,
              49.48240137826932
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              6.179809570312499,
              49.453842594330716
            ]
          },
          "properties": {
            "name":"tata",
            "category":"dukanovic"
          }
        }
        
        
      ]
    };


    var marker = L.geoJSON(geoJsonFeatures, {
      pointToLayer: (point,latlon)=> {
        return L.marker(latlon, {icon: customIcon})
    }
    });
    marker.addTo(this.map);*/
    
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.addGeoJsonFigurines() ;
  }
}