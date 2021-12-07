import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterProductComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent},
  { path: 'product-detail', component: ProductDetailComponent, data : {product : {}} },
  { path: 'register-product', component: RegisterProductComponent},
  { path: 'orders', component: OrderComponent},
  { path: 'cart', component: CartComponent, data : {product : {}}},
  { path: 'place-order', component: PlaceOrderComponent, data : {cartList : {}}},
  
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    RegisterProductComponent,
    OrderComponent,
    CartComponent,
    PlaceOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { 
        enableTracing: true 
      } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
