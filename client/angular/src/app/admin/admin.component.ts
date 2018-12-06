import { Component, OnInit } from '@angular/core';

import {UsersService} from '../services/users.service';
import { Observable } from 'rxjs';

//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  userList: Users[];

  constructor(public authService: AuthService, public usersService: UsersService) { }

  ngOnInit() {
    
     this.usersService.getUsers(this.onResponse.bind(this));
  }
  onResponse(users){
    this.userList = users;
   
  }

  

isAccessLevel3(){

  if(this.userList && !((auth().currentUser)== null)){
 
     var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == (auth().currentUser.email)){
        if(iterate[i].accessLevel >=3){
          return true;
        }
        
      }
    }
  }
    return false;
  }

isAccessLevel2(){

  if(this.userList && !((auth().currentUser)== null)){
 
     var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == (auth().currentUser.email)){
        if(iterate[i].accessLevel >=2){
          return true;
        }
        
      }
    }
  }
    return false;
  }

isAccessLevel1(){

  if(this.userList && !((auth().currentUser)== null)){
 
     var iterate = this.userList;
    for(var i = (iterate.length-1); i>=0; i--){
      if(iterate[i].email == (auth().currentUser.email)){
        if(iterate[i].accessLevel >=1){
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