
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
  accessLevel: number;
  private _response: Observable<any[]>;
  
  userList: Users[];

  constructor(public authService: AuthService, public usersService: UsersService) {}
  
  ngOnInit() {
    
    this.usersService.getUsers(this.onResponse.bind(this));
    console.log("init");
   
  
 
    
  }

  signup() {
    
    console.log(this.email)
    this.authService.signup(this.email, this.password);
    this.usersService.postUser(this.email,  this.onResponse.bind(this));
    this.getAccessLevel();
    this.email = this.password = '';
  
  }

  login() {
    this.authService.login(this.email, this.password);
    
    this.getAccessLevel();
    
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
    
      var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == this.email){
        this.accessLevel = iterate[i].accessLevel;
      }
    }
  }

  getAccessLevel(){

     var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == this.email){
        this.accessLevel = iterate[i].accessLevel;
        //console.log(iterate[i].accessLevel);
      }
    }
  }

}

interface Users{
  _id: string,
  email: string,
  accessLevel: number
  
}