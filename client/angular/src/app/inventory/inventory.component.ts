import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import { ProductsService} from '../services/products.service';
import { Observable } from 'rxjs';

//Firebase and Authentication Imports
import { auth } from 'firebase/app';
import {firebase } from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  allProducts: Products[];
  userList: Users[];
  
  editBool: boolean = false;
  
  searchInput: string;

  name: string;
  price: number;
  desc: string;
  quantity: number;
  
  edit_id: string;
  editName: string;
  editPrice: number;
  editDesc: string;
  editQuantity: number;

  constructor(public authService: AuthService, public usersService: UsersService, public productsService: ProductsService) { }

  ngOnInit() {
    
         this.productsService.getProducts(this.onResponseProducts.bind(this));
     this.usersService.getUsers(this.onResponseUsers.bind(this));
  }

onResponseUsers(users){
  this.userList = users;
}


onResponseProducts(products){
    this.allProducts = products;
}

onResponse(){
  this.productsService.getProducts(this.onResponseProducts.bind(this));
  
}
  
  addItem(){
   this.productsService.postProduct(this.name, this.price, this.desc, this.quantity).subscribe((response)=>{});
  }

editItem(){
  
 // console.log(this.editName)
  this.productsService.editProduct(this.edit_id, this.editName, this.editPrice, this.editDesc, this.editQuantity, this.onResponse.bind(this));
  
}

deleteItem(){
   this.productsService.deleteProduct(this.edit_id).subscribe((response)=>{});
  
}

search(){
  
 
  
  var iterate = this.allProducts
  
  for(var i = (iterate.length-1); i>=0; i--){
     
    
   if(iterate[i].name == this.searchInput){
     this.edit_id = iterate[i]._id;
     this.editName = iterate[i].name;
     this.editPrice = iterate[i].price;
     this.editDesc = iterate[i].desc;
     this.editQuantity = iterate[i].quantity;
 
     this.editBool = true
     return
   }
   }
  
  alert("cannot find that product");
  
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