import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signInRegular(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  signInWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }
}
