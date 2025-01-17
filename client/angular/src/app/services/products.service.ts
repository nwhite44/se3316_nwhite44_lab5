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
  
   buyProduct( _id: string, quantity: number, call_back){
    
        //console.log(name)
      
       
        this.http.put('/api/access/product/'+_id, {name : name, quantity :quantity}).subscribe(products =>{
      
      call_back(products);
    })
          
        
        
  }
  
    deleteProduct( _id: string){
    
        //console.log(name)
      
       
       return this.http.delete('/api/access/product/'+_id, {})
    
          
        
        
  }
  
    
  getComments(call_back){
    
    this.http.get('/api/create/comment').subscribe(comments => {
      call_back(comments);
    })
  }
  
   editComment( _id: string, hidden: boolean, call_back){
    
      
      
       
        this.http.put('/api/access/comment/'+_id, {hidden: hidden}).subscribe(comment =>{
      
      call_back(comment);
    })
          
        
        
  }
  
  
  getProducts(call_back){
    
    this.http.get('/api/create/product').subscribe(products => {
      call_back(products);
    })
  }
  
   postComment( email: string, content: string, rating: number, _id: string){
      
       
        return this.http.post('/api/create/comment', {'email' : email, 'content' :content, 'rating' :rating, 'item_id' :_id});
          console.log("POST success!");
        
        
  }
    
}
