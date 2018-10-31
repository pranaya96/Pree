import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./user/home/home.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { StartUpComponent } from "./start-up/start-up.component";
import { MyBusinessProfileComponent } from "./user/my-business-profile/my-business-profile.component";
import { AddEventComponent } from "./user/my-business-profile/add-event/add-event.component";
import { EventsComponent } from "./user/home/events/events.component";

export const routes: Routes = [
  { path: "", redirectTo: "/start-up", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      {
        path: "home",
        component: HomeComponent,
        children: [{ path: "events", component: EventsComponent }]
      },
      { path: "settings", component: SettingsComponent },
      {
        path: "my-business-profile",
        component: MyBusinessProfileComponent,
        children: [
          { path: "", redirectTo: "../home/events", pathMatch: "full" },
          { path: "add-event", component: AddEventComponent }
        ]
      }
    ]
  },
  { path: "start-up", component: StartUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
