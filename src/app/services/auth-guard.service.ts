import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
}
