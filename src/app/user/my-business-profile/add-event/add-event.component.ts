import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "src/app/services/user-service.service";
import { Event } from "../../../DataModels/event";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  event: Event[];
  eventName: string;
  myImage: HTMLElement;

  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getEvents().subscribe(events => {
      this.event = events;
      this.eventName = this.event["1"]["EventName"];
      console.log("event list works");
      console.log(this.event);
      console.log(this.eventName);
    });
  }
}
