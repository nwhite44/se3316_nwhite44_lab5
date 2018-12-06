import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UsersService} from '../services/users.service';


//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  
    private _response: Observable<any[]>;
  
  userList: Users[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, public usersService: UsersService) {}
  onResponse(users){
    this.userList = users;
   
  }
  
    ngOnInit() {
    
    this.usersService.getUsers(this.onResponse.bind(this));
    
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