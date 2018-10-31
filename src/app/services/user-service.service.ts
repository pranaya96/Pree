import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(private db: AngularFireDatabase) {}
  user: Observable<any[]>;
  getEvents() {
    return this.db.list("user").valueChanges();
  }
}
