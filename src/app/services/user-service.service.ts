import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable, of } from "rxjs";
import { User } from "../DataModels/user";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  userId: string;
  user: AngularFireList<any[]>;
  User: Observable<any>;
  events: AngularFireList<any[]>;
  Event: Observable<any>;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }
  getuserInfo() {
    if (!this.userId) return;
    this.user = this.db.list(`users/${this.userId}`);
    this.User = this.user.valueChanges();
    return this.User;
  }
  getBusinessUserEvents() {
    this.events = this.db.list(`Events/${this.userId}`);
    this.Event = this.events.valueChanges();
    return this.Event;
  }
  getEventsForBusinessUser() {
    this.events = this.db.list("Events");
    this.Event = this.events.valueChanges();
    return this.Event;
  }
}
