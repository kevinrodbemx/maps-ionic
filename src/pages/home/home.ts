import { clinicas } from './../../data/clinicas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  MarkerCluster,
  GoogleMapsAnimation,
  MyLocation,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  myIcons = [
    {
      min: 2,
      max: 100,
      url: 'https://openclipart.org/image/2400px/svg_to_png/204420/Map-Pointer.png',
      anchor: { x: 16, y: 16 },
      size: {
        width: 54,
        height: 64
      }
    },
    {
      min: 100,
      url: 'https://image.flaticon.com/icons/png/512/252/252106.png',
      anchor: { x: 16, y: 16 },
      size: {
        width: 54,
        height: 64
      }
    }
  ];
  mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: -12.096831,
        lng: -77.024012
      },
      zoom: 10
    }
  };

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {}

  ionViewDidLoad() {
    this.map = this.googleMaps.create('map_canvas', this.mapOptions);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.loadClinicas2();
      console.log('ready');
    });
  }

  loadClinicas() {
    this.map
      .addMarkerCluster({
        title: 'Ionic',
        icons: this.myIcons,
        boundsDraw: false,
        maxZoomLevel: 12,
        markers: clinicas.slice(0, 85)
      })
      .then((markerCluster: MarkerCluster) => {
        markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(params => {
          let marker: Marker = params[1];

          marker.setAnimation(GoogleMapsAnimation.BOUNCE);
          marker.setTitle(marker.get('name'));
          marker.setSnippet(marker.get('address'));
          marker.showInfoWindow();
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  loadClinicas2() {
    this.map
      .addMarkerCluster({
        title: 'Ionic',
        boundsDraw: false,
        maxZoomLevel: 12,
        icons: this.myIcons,
        markers: clinicas.slice(0)
      })
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.error(e);
      });
  }
}
