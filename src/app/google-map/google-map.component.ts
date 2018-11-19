import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit, OnDestroy {

  lat: number;
  lng: number;
  markers: any;
  subscription: any;

  constructor(private geo: GeoService) { }

  ngOnInit() {
	  this.getUserLocation()
	  this.subscription = this.geo.hits
        .subscribe(hits => this.markers = hits)
	  this.seedDatabase()

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private seedDatabase() {
    let dummyPoints = [
      [37.9, -77.1],
      [38.7, -77.2],
      [38.1, -77.3],
      [38.3, -77.0],
      [38.7, -122.1]
    ]

    dummyPoints.forEach((val, idx) => {
      let name = `dummy-location-${idx}`
      console.log(idx, name, val)
      this.geo.setLocation(name, val)
    })
  }

  private getUserLocation() {
	  //locate the user
	  if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(position => {
			  this.lat = position.coords.latitude;
			  this.lng = position.coords.longitude;
			  this.geo.getLocations(80, [this.lat, this.lng])
		  });
	  }
  }
}
