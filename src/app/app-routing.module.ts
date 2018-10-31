import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./user/home/home.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { StartUpComponent } from "./start-up/start-up.component";
import {RegisterBusinessComponent} from "./register-business/register-business.component";

export const routes: Routes = [
  { path: "", redirectTo: "/start-up", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {path: "register-business", component:RegisterBusinessComponent},
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "settings", component: SettingsComponent }
    ]
  },
  { path: "start-up", component: StartUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
