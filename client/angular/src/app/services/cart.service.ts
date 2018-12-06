import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartArray: string[] = [];


  constructor(private http: HttpClient) { }
  

  
  getProducts(call_back){
    
    this.http.get('/api/create/product').subscribe(products => {
      call_back(products);
    })
  }
  
  
}
