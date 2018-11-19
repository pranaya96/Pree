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
  event: Array<any[]>;
  eventName: String;
  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getEvents().subscribe(events => {
      this.event = events;
      console.log("event list works");
      console.log(this.event);
      console.log(this.event[0]);
      (error: any) => {
        console.log("error", error);
      };
    });
  }
}
