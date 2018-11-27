import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AppRoutingModule } from "../app-routing.module";
import { Router } from "@angular/router";
import { User } from "../DataModels/user";
import { AngularFireDatabase } from "angularfire2/database";

export interface BusinessType {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-register-business",
  templateUrl: "./register-business.component.html",
  styleUrls: ["./register-business.component.css"]
})
export class RegisterBusinessComponent implements OnInit {
  userEmail: string = "";
  userPassword: string = "";
  currUser: User = new User();
  fullName: string = "";
  userId: string = "";
  userAddress: string = "";
  userPhone: string = "";
  userIsBusiness: boolean = false;
  userBusinessType: string = "";
  userBusinessDescription: string = "";
  userPicUrl: string = "";

  constructor(
    private af: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {}

  onSubmit(userEmail, userPassword) {
    this.af.auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(response => {
        console.log(response.user.uid);
        this.currUser.name = this.fullName;
        this.currUser.address = this.userAddress;
        this.currUser.phoneNumber = this.userPhone;
        this.currUser.isBusiness = true;
        this.currUser.businessType = this.userBusinessType;
        this.currUser.userPicUrl = "";
        this.currUser.businessDescription = this.userBusinessDescription;
        this.currUser.emailAddress = userEmail;
        this.db.list(`users/${response.user.uid}`).push(this.currUser);
        this.router.navigate(["user/home"]);
      })
      .catch(error => console.log(error));
  }

  businessTypes: BusinessType[] = [
    { value: "resturant", viewValue: "Resturant" },
    { value: "club", viewValue: "Club" },
    { value: "other", viewValue: "Other" }
  ];
}
