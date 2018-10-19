import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AppRoutingModule } from "../app-routing.module";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  userEmail: string = "";
  userPassword: string = "";

  constructor(private af: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  onSubmit(userEmail, userPassword) {
    this.af.auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => console.log("sucess"), this.router.navigate["/login"])
      .catch(error => console.log(error));
  }
}
