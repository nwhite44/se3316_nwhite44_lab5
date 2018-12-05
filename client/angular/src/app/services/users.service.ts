import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
  
  postUser( email: string, call_back){
        console.log(email);
       
        this.http.post('/api/create/user', {'email' : email, 'accessLevel' : 0}).subscribe(data =>{
          console.log("POST success!");
          call_back(data);
        });
  }
  
  
  getUsers(call_back){
    
    this.http.get('/api/create/user').subscribe(users => {
      call_back(users);
    })
  }
  
}
