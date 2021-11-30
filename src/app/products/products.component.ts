import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { CommonService } from '../services/common.service';
import { ProductsService } from './products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //product: Product = {"productId":456378,"productName":"Refrigerator","description":"Intelli Sense Refrigerator","price":18199,"year":2021,"company":"Samsung","quantity":5};
	  
  productList: any=[];
  load: boolean = true;


  constructor(public router: Router, public productService: ProductsService, public commonService: CommonService) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  clickProduct(product: Product){

    this.router.navigate(['/product-detail'], { state: { productObj: product } });
  }

  loadProducts(){
    var url = this.commonService.getServiceEndpoint();

    this.load = true;

    this.productService.getAllProducts(url).subscribe((response: any) => {
      console.log(response);
      
      response.forEach((element: Product) => {
        var image = element.image;
        element.image = 'data:image/jpeg;base64,'+image;
      });
      this.productList = response;
      this.load = false;
    });
  }

 

}
