import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppRoutingModule } from "../app-routing.module";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { auth } from "firebase/auth";
import { error } from "protractor";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  hide = true;
  user: any;
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router) {
    this.user = {
      name: "",
      email: "",
      loginSuccess: true,
      isbusiness: Boolean
    };
  }
  ngOnInit() {}

  signInWithEmail(email, password) {
    this.authService
      .signInRegular(this.user.email, this.user.password)
      .then(() => {
        this.router.navigate(["user/home"]);
      })
      .catch(error => {
        this.user.loginSuccess = false;
        this.errorMessage = error.message;
      });
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(response => {
        this.router.navigate(["user/home"]);
      })
      .catch(err => console.log(err));
  }

  signInWithFacebook() {
    this.authService
      .signInWithFacebook()
      .then(response => {
        this.router.navigate(["user/home"]);
      })
      .catch(err => console.log(err));
  }
}
