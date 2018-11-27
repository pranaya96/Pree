import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "src/app/services/user-service.service";
import { Event } from "../../../DataModels/event";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  event: Event[];
  currEvent: Event = new Event();
  eventname: string;
  eventdate: Date;
  eventlocation: string;
  eventtime: string;
  eventtype: string;
  eventprice: string;
  eventphotoUrl: string;
  eventdescription: string;
  userId: string;

  constructor(
    public db: AngularFireDatabase,
    public userService: UserServiceService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  ngOnInit() {
    this.userService.getEvents().subscribe(events => {
      this.event = events;
    });
  }

  addEvent() {
    this.currEvent.eventName = this.eventname;
    this.currEvent.eventDate = this.eventdate.toDateString();
    this.currEvent.eventLocation = this.eventlocation;
    this.currEvent.eventTime = this.eventtime;
    this.currEvent.eventPrice = this.eventprice;
    this.currEvent.eventType = this.eventtype;
    this.currEvent.eventPhotoUrl = this.eventphotoUrl;
    this.currEvent.eventDescription = this.eventdescription;
    this.currEvent.eventPhotoUrl = "";
    this.db.list(`Events/${this.userId}`).push(this.currEvent);
    this.router.navigate(["user/home"]);
  }
}
