
import { Component } from '@angular/core';

import {UsersService} from '../services/users.service';
import { Observable } from 'rxjs';

//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  
  private _response: Observable<any[]>;
  
  userList: Users[];

  constructor(public authService: AuthService, public usersService: UsersService) {}
  
  ngOnInit() {
    
    this.usersService.getUsers(this.onResponse.bind(this));
    
  }

  signup() {
    
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
  
//  onResponse(_res: Observable<any[]>){
//    this._response = _res;
//  }
  
  onResponse(users){
    this.userList = users;
   
  }

  

isAccessLevel2(){

  if(this.userList && !((auth().currentUser)== null)){
 
     var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == (auth().currentUser.email)){
        if(iterate[i].accessLevel ==2){
          return true;
        }
        
      }
    }
  }
    return false;
  }

}

interface Users{
  _id: string,
  email: string,
  accessLevel: number
  
}