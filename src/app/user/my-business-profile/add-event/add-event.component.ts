import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { UserServiceService } from "src/app/services/user-service.service";
import { Event } from "../../../DataModels/event";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  event: Event[];
  currEvent: Event = new Event();
  eventname: string;
  eventdate: Date;
  eventlocation: string;
  eventtime: string;
  eventtype: string;
  eventprice: string;
  eventphotoUrl: string;
  eventdescription: string;
  userId: string;
  file: File;
  selectedFiles: FileList;
  uploadPercent: Observable<Number>;
  downLoadURL: Observable<string>;
  image: string = null;

  constructor(
    public db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public userService: UserServiceService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  ngOnInit() {
    this.userService.getBusinessUserEvents().subscribe(events => {
      this.event = events;
    });
  }

  addEvent() {
    this.currEvent.eventName = this.eventname;
    this.currEvent.eventDate = this.eventdate.toDateString();
    this.currEvent.eventLocation = this.eventlocation;
    this.currEvent.eventTime = this.eventtime;
    this.currEvent.eventPrice = this.eventprice;
    this.currEvent.eventType = this.eventtype;
    this.currEvent.eventPhotoUrl = this.eventphotoUrl;
    this.currEvent.eventDescription = this.eventdescription;
    this.currEvent.eventPhotoUrl = this.image;
    this.db.list(`Events/${this.userId}`).push(this.currEvent);
    this.router.navigate(["user/home"]);
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
}
