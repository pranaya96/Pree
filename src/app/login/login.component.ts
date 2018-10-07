import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppRoutingModule } from '../app-routing.module'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})


export class LoginComponent implements OnInit{
  public authService: AuthService;
  public router: AppRoutingModule;
  user = {
    email: '',
    password: ''
  };

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
       .then((res) => {
          console.log(res);
          //this.router.routes(['user']);
       })
       .catch((err) => console.log('error: ' + err));
       
 }

 signInWithGoogle() {
  this.authService.signInWithGoogle()
  .then((res) => { 
      //this.router.navigate(['dashboard'])
    })
  .catch((err) => console.log(err));
}



  
  constructor() {
    
   }
  
  ngOnInit() {

    
  }

}




















