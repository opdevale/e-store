import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cartList: any[];
  ngOnInit(): void {
    this.router.navigate(['/products']);
  }

  constructor(public router: Router) { 
    const products: any = localStorage.getItem('cartList');
    this.cartList= JSON.parse(products);
    
  }
  title = 'e-store';
}
