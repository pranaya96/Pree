import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "src/app/services/user-service.service";
import { Event } from "../../../DataModels/event";
import { eventNames } from "cluster";
import { promise } from "protractor";
declare let paypal: any;
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit, AfterViewChecked {
  eventKey = "";
  allEvent: Event[] = [];
  event: Array<any[]>;
  eventName: String;
  numPerPage: number = 10;
  addScript: boolean = false;
  finalAmount: number = 1;
  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getBusinessUserEvents().subscribe(events => {
      this.event = events;
      // console.log("event list works");
      // console.log(this.event);
      (error: any) => {
        console.log("error", error);
      };
    });

    this.userService.getEventsForBusinessUser().subscribe(events => {
      let tempEvent: Array<any[]>;
      tempEvent = events;
      // console.log("ALL events");
      // console.log(tempEvent);
      let tempallEventList: Event[] = [];
      tempEvent.forEach(function(value) {
        let eachEvent = value;
        // console.log("Value");
        // console.log(value);
        Object.keys(eachEvent).forEach(function(key) {
          tempallEventList.push(eachEvent[key]);
          // console.log("key");
          // console.log(key);
          // console.log(eachEvent[key]);
        });
      });
      this.allEvent = tempallEventList;
      console.log(this.allEvent);
    });
  }
  paypalConfig = {
    env: "sandbox",
    client: {
      sandbox:
        "AU_QKx9msQkXg1QR-jSI8MMGXmJzQSNAjXFYgLw5cQ2y3sk7QfLV5x9nC5deKa0A4SagOJk02e4MD0cw"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: "USD" } }
          ]
        }
      });
    },

    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        window.alert("Thank you for your purchase");
      });
    }
  };
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, "#paypal-checkout-btn");
      });
    }
  }
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement("script");
      scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  attendEvent(key) {}
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
