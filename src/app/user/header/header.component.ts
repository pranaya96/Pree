import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "src/app/services/user-service.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isbusiness: Boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit() {
    this.userService.getuserInfo().subscribe(user => {
      this.isbusiness = user[0]["isBusiness"];
      console.log(this.isbusiness);
    });
  }

  logout() {
    this.authService.logout();
  }
}
