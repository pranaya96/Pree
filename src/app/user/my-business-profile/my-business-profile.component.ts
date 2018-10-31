import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-business-profile",
  templateUrl: "./my-business-profile.component.html",
  styleUrls: ["./my-business-profile.component.css"]
})
export class MyBusinessProfileComponent implements OnInit {
  hide: boolean = true;
  constructor() {}
  ngOnInit() {}
  addEvent() {
    this.hide = false;
  }
}
