import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadiusService {
	
  radius: number;

  constructor() {
	this.radius = 150;  
  }
  
  //Setter for radius
  setRadius(option: number) {
	  this.radius = option;
  }
  
  //Getter for radius
  getRadius() {
	  return this.radius;
  }
}
