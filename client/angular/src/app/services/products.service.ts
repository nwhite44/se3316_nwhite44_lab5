import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  
  
  testFunction(){
    return false;
  }
  
  getProducts(call_back){
    
    this.http.get('/api/create/product').subscribe(products => {
      call_back(products);
    })
  }
    
}
