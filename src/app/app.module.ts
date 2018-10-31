import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AuthService } from "./services/auth.service";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { routes } from "./app-routing.module";
import { StartUpComponent } from './start-up/start-up.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule

} from "@angular/material";
import { HeaderComponent } from "./user/header/header.component";
import { HomeComponent } from "./user/home/home.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { RegisterBusinessComponent } from './register-business/register-business.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HeaderComponent,
    HomeComponent,
    SettingsComponent,
    StartUpComponent,
    RegisterBusinessComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatOptionModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
