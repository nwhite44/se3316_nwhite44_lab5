
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {UsersService} from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  private _response: Observable<any[]>;

  constructor(public authService: AuthService, public usersService: UsersService) {}

  signup() {
    
    console.log(this.email)
    this.authService.signup(this.email, this.password);
    this.usersService.postUser(this.email,  this.onResponse.bind(this));
    this.email = this.password = '';
  
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }
  
  onResponse(_res: Observable<any[]>){
    this._response = _res;
  }
}