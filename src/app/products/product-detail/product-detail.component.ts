import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input()
  product: any;


  constructor(private productService: ProductsService, public activateRoute: ActivatedRoute, public router: Router) {
    //this.product = this.activateRoute.snapshot.queryParamMap.get("product"); 
    let nav: any = this.router.getCurrentNavigation();

    if (nav.extras && nav.extras.state && nav.extras.state.productObj) {
      this.product = nav.extras.state.productObj as Product;
    }

  }

  ngOnInit(): void {}

  addToCart(){
    this.router.navigate(['/cart'], { state: { productObj: this.product } });
  }

}
