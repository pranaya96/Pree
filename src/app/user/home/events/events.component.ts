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
  allEvent: Event[] = [];
  event: Array<any[]>;
  eventName: String;
  numPerPage: number = 10;
  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getBusinessUserEvents().subscribe(events => {
      this.event = events;
      console.log("event list works");
      console.log(this.event);
      (error: any) => {
        console.log("error", error);
      };
    });

    this.userService.getEventsForBusinessUser().subscribe(events => {
      let tempEvent: Array<any[]>;
      tempEvent = events;
      let tempallEventList: Event[] = [];
      tempEvent.forEach(function(value) {
        let eachEvent = value;
        Object.keys(eachEvent).forEach(function(key) {
          tempallEventList.push(eachEvent[key]);
        });
      });
      this.allEvent = tempallEventList;
    });
  }

  moreResults() {
    this.numPerPage = this.numPerPage + 10;
  }

  lessResults() {
    if (this.numPerPage > 10) {
      this.numPerPage = this.numPerPage - 10;
    } else {
      this.numPerPage = 10;
    }
  }
}
