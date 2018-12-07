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
 commentInput: string;
 rating: number;

  constructor(private productsService: ProductsService, public authService: AuthService, public usersService: UsersService, public cartService: CartService) { }

  ngOnInit() {
    
     this.productsService.getProducts(this.onResponseProducts.bind(this));
     this.usersService.getUsers(this.onResponseUsers.bind(this));
    
  }

onResponseUsers(users){
  this.userList = users;
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

addToCart(name: string){
    this.cartService.cartArray.push(name);
    console.log(this.cartService.cartArray.length);
}

sendComment(_id: string){
 
   this.productsService.postComment(auth().currentUser.email, this.commentInput, this.rating, _id).subscribe((response)=>{});
  
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