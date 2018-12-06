import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {
  

  constructor(private http: HttpClient) { };
  

  
  postUser( email: string){
        console.log(email);
       
        return this.http.post('/api/create/user', {'email' : email, 'accessLevel' : 1});
          console.log("POST success!");
        
        
  }
  
  
  getUsers(call_back){
    
    this.http.get('/api/create/user').subscribe(users => {
      call_back(users);
    })
  }
  
}
