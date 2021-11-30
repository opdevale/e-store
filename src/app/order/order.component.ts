import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from './order.service';
import { CommonService } from '../services/common.service';
import { Product } from '../model/product';
import { Order } from '../model/order';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any = [];
  load: boolean = true;

  

  constructor(private route: ActivatedRoute,
    private router: Router,
    public OrderService: OrderService, private commonService: CommonService) {
     
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(){
    this.load = true;
    this.OrderService.getOrders().subscribe((response: Order) => {
      this.orders = (response);
      this.load = false;
    });
  }
 
  
  

  
    

  

}
