import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable, of } from "rxjs";
import { User } from "../DataModels/user";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  user: AngularFireList<any[]>;
  User: Observable<any>;
  events: AngularFireList<any[]>;
  Event: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.user = db.list("users");
    this.User = this.user.valueChanges();
    this.events = db.list("Events");
    this.Event = this.events.valueChanges();
  }
  getuserInfo() {
    return this.User;
  }
  getEvents() {
    return this.Event;
  }
}
