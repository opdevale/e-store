import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { CommonService } from '../services/common.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  product: any;
  cartList: any[] = [];
  totalPrice: number = 0;

  constructor(public activateRoute: ActivatedRoute, public router: Router, public cartService: CartService,public commonService: CommonService) { 

    this.product = localStorage.getItem('cartList');
    if(this.product != undefined){
      this.cartList= JSON.parse(this.product);
    }
    let nav: any = this.router.getCurrentNavigation();

    if (nav.extras && nav.extras.state && nav.extras.state.productObj) {
      this.product = nav.extras.state.productObj as Product;
      var count = 1;
      var alreadyElement = false;
      this.cartList.forEach(element => {
        if(element.id == this.product.productId){
           count = element.count +1;
           element.count = count;
           alreadyElement = true;
        } 
      });
      if(!alreadyElement){
        this.cartList.push({'id':this.product.productId,'count':count, 'product': this.product});
      }
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
      //this.commonService.addProductsInCart(this.product);
    }
    

  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.cartList.forEach(object =>{
      this.totalPrice = this.totalPrice + (object.count * object.product.price);
    });
  }

  removeProductFromCart(product: any){
    var carts : any[] = [];
    this.cartList.forEach(object =>{
      if(object.id != product.id){
        carts.push(object);
      } else {
        if(object.count > 1){
          object.count--;
          carts.push(object);
        }
      }
    });

    this.cartList = carts;
    localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }

  placeOrder(){

    this.cartList.forEach(element => {
      var order: Order = {'orderId':0,'productId': element.product.productId, 'productName': element.product.productName,
      'price': (element.count * element.product.price),
      'quantity': element.count, 'status': "ACCEPTED"};

      this.cartService.placeOrder(order).subscribe(response =>{
        console.log(response);
        
      });
      
    });
    this.router.navigate(['/orders']);
    //this.router.navigate(['/place-order'], { state: { cartList: this.cartList } });
  }

  

}
