import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../services/products.service';
import {UsersService} from '../services/users.service';
import { Observable } from 'rxjs';
import {CartService} from '../services/cart.service';

//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 allProducts: Products[];
 userList: Users[];
 cartList: Cart[];
 commentList: Comments[];
 commentInput: string;
 rating: number = 1;

  constructor(private productsService: ProductsService, public authService: AuthService, public usersService: UsersService, public cartService: CartService) { }

  ngOnInit() {
    
     this.productsService.getProducts(this.onResponseProducts.bind(this));
     this.usersService.getUsers(this.onResponseUsers.bind(this));
     this.productsService.getComments(this.onResponseComments.bind(this));
     this.cartService.getCart(this.onResponseCart.bind(this));
  }

onResponseUsers(users){
  this.userList = users;
}

onResponseCart(cart){
  this.cartList = cart;
}


onResponseComments(comments){
  this.commentList = comments;
}

onResponseProducts(products){
    this.allProducts = products;
    
    var iterate = this.allProducts
 
   for(var i = (iterate.length-1); i>=0; i--){
   if(iterate[i].quantity <= 0){
     iterate.splice(i,1);
   }
   }
}

addToCart(_id: string){
  
    var iterate = this.allProducts;
    for(var i = (iterate.length-1); i>=0; i--){
     
      if(iterate[i]._id == _id){
        
        
        if(iterate[i].quantity <=0){
          alert("Sorry this item is out of stock");
          return;
          }
        
 
        var iterate2 = this.cartList;
        for(var j = (iterate2.length-1); j>=0; j--){
          
          if(iterate2[j].name == iterate[i].name){
            
            console.log("this item already exists");
          
            this.cartService.editCart(iterate2[j]._id, (iterate2[j].quantity + 1) , this.onResponseEditCart.bind(this));
            return;
        
          }
        }
        
        console.log("this item doesnt already exist")
        
        this.cartService.postCart(iterate[i].name, iterate[i].price, 1, this.onResponseEditCart.bind(this));
        
        
      }
    }
  
}

sendComment(_id: string){
 
   this.productsService.postComment(auth().currentUser.email, this.commentInput, this.rating, _id).subscribe((response)=>{});
     
}

toggleComment(_id: string, hidden: boolean){
  
  console.log(_id);

  this.productsService.editComment(_id, !(hidden), this.onResponse.bind(this));
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
  
  checkComment(id1: string, id2: string){

    if(id1 == id2){
      return true;
    }
    return false;
  }
  
  onResponse(){
      this.productsService.getComments(this.onResponseComments.bind(this));
  
}

onResponseEditCart(){
  this.cartService.getCart(this.onResponseCart.bind(this));
  
}

}

interface Products{
  _id: string,
  name: string,
  price: number,
  desc: string,
  quantity: number,
  views: number
  
}

interface Users{
  _id: string,
  email: string,
  accessLevel: number
  
}

interface Comments{
  _id: string;
  email: string;
  content: string;
  rating: number;
  hidden: boolean;
  item_id: string;
}

interface Cart{
  _id: string,
  name: string,
  price: number,
  quantity: number,
  
}