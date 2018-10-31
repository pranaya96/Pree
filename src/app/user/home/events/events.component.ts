import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  event: any;
  constructor(private us: UserServiceService) {}
  ngOnInit() {}
}
