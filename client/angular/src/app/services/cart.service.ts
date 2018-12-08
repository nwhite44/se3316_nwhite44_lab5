import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {




  constructor(private http: HttpClient) { }
  

  
  getProducts(call_back){
    
    this.http.get('/api/create/product').subscribe(products => {
      call_back(products);
    })
  }
  
   postCart( name: string, price: number, quantity: number, call_back){
      
       
        return this.http.post('/api/create/cart', {'name' : name, 'price' :price, 'quantity' :quantity}).subscribe(cart =>{
      
      call_back(cart);
    })
          console.log("POST success!");
        
        
  }
  
  getCart(call_back){
    
    this.http.get('/api/create/cart').subscribe(cart => {
      call_back(cart);
    })
  }
  
   editCart( _id: string, quantity: number, call_back){
    
  
      
      
       
        this.http.put('/api/access/cart/'+_id, {'quantity': quantity}).subscribe(cart =>{
      
      call_back(cart);
    })
          
        
        
  }
  
      deleteCart( _id: string){
    
        
      
       
       return this.http.delete('/api/access/cart/'+_id, {})
    
          
        
        
  }
  
   editCart2( _id: string, quantity: number){
    
  
   
      
       
        return this.http.put('/api/access/cart/'+_id, {'quantity': quantity});
          
        
        
  }
  
  
}
