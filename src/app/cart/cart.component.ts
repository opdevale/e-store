import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  product: any;
  cartList: any[] = [];
  totalPrice: number = 0;

  constructor(public activateRoute: ActivatedRoute, public router: Router, public commonService: CommonService) { 

    this.product = localStorage.getItem('cartList');
    this.cartList= JSON.parse(this.product);
    let nav: any = this.router.getCurrentNavigation();

    if (nav.extras && nav.extras.state && nav.extras.state.productObj) {
      this.product = nav.extras.state.productObj as Product;
      this.cartList.push({'id':this.product.productId, 'product': this.product});
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
      //this.commonService.addProductsInCart(this.product);
    }
    

  }
  ngOnDestroy(): void {
    //localStorage.setItem('cartList', JSON.stringify([]));
  }

  ngOnInit(): void {
   
  }

  removeProductFromCart(product: any){
    var carts : any[] = [];
    this.cartList.forEach(object =>{
      if(object.id != product.id){
        carts.push(object);
      }
    });

    this.cartList = carts;
    localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }

}
