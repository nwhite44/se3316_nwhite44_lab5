import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../services/products.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 allProducts: Products[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    
     this.productsService.getProducts(this.onResponse.bind(this));
    
  }

onResponse(products){
    this.allProducts = products;
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