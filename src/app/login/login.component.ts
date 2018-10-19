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
      invalid: "bye",
      loginSuccess: true
    };
  }
  ngOnInit() {}

  signInWithEmail(email, password) {
    this.authService
      .signInRegular(this.user.email, this.user.password)
      .then(response => {
        let credential = response.credential;
        let user = response.user;
        console.log(response);
        this.router.navigate(["user"]);
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
        this.router.navigate(["user"]);
      })
      .catch(err => console.log(err));
  }

  signInWithFacebook() {
    this.authService
      .signInWithFacebook()
      .then(response => {
        this.router.navigate(["user"]);
      })
      .catch(err => console.log(err));
  }
}
