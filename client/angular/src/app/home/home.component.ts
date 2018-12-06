import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../services/products.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 allProducts: Products[];
 top5: Products[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    
    this.productsService.getProducts(this.onResponse.bind(this));
    
 
    
  }
  
   onResponse(products){
    this.allProducts = products;
    
    var iterate = this.allProducts
   iterate.sort(function(a,b){
     return a.views-b.views
   });
   iterate.reverse();
   
   for(var i = (iterate.length-1); i>4; i--){
   iterate.pop();
   }
   
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