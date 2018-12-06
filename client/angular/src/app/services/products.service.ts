import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  
   postProduct( name: string, price: number, desc: string, quantity: number){
      
       
        return this.http.post('/api/create/product', {'name' : name, 'price' :price, 'desc' :desc, 'quantity' :quantity});
          console.log("POST success!");
        
        
  }
  
  editProduct( _id: string, name: string, price: number, desc: string, quantity: number, call_back){
    
        //console.log(name)
      
       
        this.http.put('/api/access/product/'+_id, {name : name, price :price, desc :desc, quantity :quantity}).subscribe(products =>{
      
      call_back(products);
    })
          
        
        
  }
  
    deleteProduct( _id: string){
    
        //console.log(name)
      
       
       return this.http.delete('/api/access/product/'+_id, {})
    
          
        
        
  }
  
  
  getProducts(call_back){
    
    this.http.get('/api/create/product').subscribe(products => {
      call_back(products);
    })
  }
    
}
