import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "../../services/user-service.service";
import { User } from "../../DataModels/user";

@Component({
  selector: "app-my-business-profile",
  templateUrl: "./my-business-profile.component.html",
  styleUrls: ["./my-business-profile.component.css"]
})
export class MyBusinessProfileComponent implements OnInit {
  hide: boolean = true;
  userInfo: User[];
  constructor(
    public af: AngularFireDatabase,
    public userService: UserServiceService
  ) {}
  ngOnInit() {
    this.userService.getuserInfo().subscribe(user => {
      this.userInfo = user;
      console.log("ok");
      console.log(user);
    });
  }
  addEvent() {
    console.log("bye");
    this.hide = false;
  }
}
