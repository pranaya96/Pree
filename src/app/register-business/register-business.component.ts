import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AppRoutingModule } from "../app-routing.module";
import { Router } from "@angular/router";
import { User } from "../DataModels/user";
import { MatProgressBarModule } from "@angular/material";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";

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
  file: File;
  selectedFiles: FileList;
  uploadPercent: Observable<Number>;
  downLoadURL: Observable<string>;
  image: string = null;

  constructor(
    private af: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
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
        this.currUser.userPicUrl = this.image;
        this.currUser.businessDescription = this.userBusinessDescription;
        this.currUser.emailAddress = userEmail;
        this.db.list(`users/${response.user.uid}`).push(this.currUser);
        this.router.navigate(["user/home"]);
      })
      .catch(error => console.log(error));
  }
  chooseFiles(event) {
    console.log(event);
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)) {
      this.uploadPic();
    }
  }
  uploadPic() {
    const file = this.selectedFiles.item(0);
    const path = `pics/${file.name}`;
    const fileRef = this.storage.ref(path);
    if (file.type.split("/")[0] !== "image") {
      return alert("takes only image files");
    } else {
      const uploadTask = this.storage.upload(path, file);
      this.uploadPercent = uploadTask.percentageChanges();
      // get notified when the download URL is available
      //   uploadTask.snapshotChanges().pipe(
      //     finalize(() => {
      //         this.downLoadURL = fileRef.getDownloadURL();
      //         console.log(this.downLoadURL)
      //         this.downLoadURL.subscribe()
      //     })
      // )

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log("reached here");
              console.log(url);
              this.image = url; // <-- do what ever you want with the url..
            });
          })
        )
        .subscribe();
    }
  }

  businessTypes: BusinessType[] = [
    { value: "resturant", viewValue: "Resturant" },
    { value: "club", viewValue: "Club" },
    { value: "other", viewValue: "Other" }
  ];
}
