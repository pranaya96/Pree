import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AppRoutingModule } from "../app-routing.module";
import { Router } from "@angular/router";
import {User} from "../DataModels/user";
import {AngularFireDatabase} from 'angularfire2/database';



@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  currUser: User = new User();

  fullName:string = "";
  //userId:string = "";
  userAddress: string = "";
  userPhone: string = "";
  //userIsBusiness:boolean = false;
  //userBusinessType: string= "";
  //userBusinessDescription: string="";
  //userPicUrl:string="";

  userEmail: string = "";
  userPassword: string = "";


  constructor(private af: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {}

  ngOnInit() {}

  onSubmit(userEmail, userPassword) {
    this.af.auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(response => {
        console.log(this.currUser);
        this.currUser.name = this.fullName;
        this.currUser.address = this.userAddress;
        this.currUser.phoneNumber = this.userPhone;
        this.currUser.isBusiness = false;
        this.currUser.businessType = "";
        this.currUser.userPicUrl = "";
        this.currUser.businessDescription = "";
        this.currUser.emailAddress = userEmail;
        this.db.list('users').push(this.currUser)
        
        console.log(response);
        this.router.navigate(["user"]);
      })
      .catch(error => console.log(error));
  }
}
