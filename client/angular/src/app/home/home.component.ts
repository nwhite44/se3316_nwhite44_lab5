import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 products: Products[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    
    this.productsService.getProducts(this.onResponse.bind(this));
    
    
    
  }
  
   onResponse(products){
    this.products = products;
  }
  
  orderProducts(products: Products[]){
    
    
    
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