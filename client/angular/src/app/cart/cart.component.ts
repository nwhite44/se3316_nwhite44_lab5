import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../services/products.service';
import {UsersService} from '../services/users.service';
import {CartService} from '../services/cart.service';
import { Observable } from 'rxjs';

//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  userList: Users[];
  cartList: Cart[];
  allProducts: Products[];
  total: number=0;

  constructor( private cartService: CartService, private authService: AuthService, private usersService: UsersService, private productsService: ProductsService) { }

  ngOnInit() {
    
     this.productsService.getProducts(this.onResponseProducts.bind(this));
    this.usersService.getUsers(this.onResponseUser.bind(this));
       this.cartService.getCart(this.onResponseCart.bind(this));
    
  }

  onResponseUser(users){
    this.userList = users;
   
  }
  
  onResponseProducts(products){
    this.allProducts = products;
  }

  onResponse(){
    
  }
  
  onResponseCart(cart){
  this.cartList = cart;
  
  
    var iterate = this.cartList;
    for(var i = (iterate.length-1); i>=0; i--){
      
      this.total = this.total + (iterate[i].price * iterate[i].quantity);
      
    }
    
    this.total = this.total*1.13
  
}

increase(_id: string, quantity: number, name: string){
  
  var iterate = this.allProducts;
    for(var i = (iterate.length-1); i>=0; i--){
     
      if(iterate[i].name == name){
        if(iterate[1].quantity < (quantity+1)){
          alert("There isn't enough of that fish in stock!")
          return
        }
        
      }
    }
 this.cartService.editCart2(_id, (quantity + 1)).subscribe((response)=>{});
}

decrease(_id: string, quantity: number){
  if((quantity-1) == 0){
    this.cartService.deleteCart(_id).subscribe((response)=>{});
    return;
  }
  
 this.cartService.editCart2(_id, (quantity - 1)).subscribe((response)=>{});
}

deleteCart(){
    var iterate2 = this.cartList;
  for(var j = (iterate2.length-1); j>=0; j--){
    this.cartService.deleteCart(iterate2[j]._id).subscribe((response)=>{});
    
  }
  
}

purchase(){
  
  var iterate = this.allProducts;
  var iterate2 = this.cartList;
    for(var i = (iterate.length-1); i>=0; i--){
     
      for(var j = (iterate2.length-1); j>=0; j--){
        
        if(iterate[i].name == iterate2[j].name){
          
    
  

  this.productsService.editProduct(iterate[i]._id, iterate[i].name, iterate[i].price, iterate[i].desc, (iterate[i].quantity-iterate2[j].quantity), this.onResponse.bind(this));
  this.deleteCart();
  

        }
        
      }
    }
  

  
  

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

interface Cart{
  _id: string,
  name: string,
  price: number,
  quantity: number,
  
}

interface Products{
  _id: string,
  name: string,
  price: number,
  desc: string,
  quantity: number,
  views: number
  
}