import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "src/app/services/user-service.service";
import { Event } from "../../../DataModels/event";
import { eventNames } from "cluster";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  event: Event[];
  eventName: Iterable<Event>;

  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getEvents().subscribe(events => {
      this.event = events;
      this.eventName = this.event.values();
      console.log(this.eventName);
      console.log("event list works");
      console.log(this.event);
    });
  }
}
