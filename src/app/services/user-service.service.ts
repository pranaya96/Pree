import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";
import { User } from "../DataModels/user";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  user: AngularFireObject<any[]>;
  User: Observable<any>;
  events: AngularFireObject<any[]>;
  Event: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.user = db.object("users");
    this.User = this.user.valueChanges();
    this.events = db.object("Events");
    this.Event = this.events.valueChanges();
  }
  getuserInfo() {
    return this.User;
  }
  getEvents() {
    return this.Event;
  }
}
