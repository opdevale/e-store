import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  
  apiURL: string = "http://localhost:8080";

  cartList: Product[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  
  /**
   * Get backend REST service endpoint url 
   * configured in index.html as window url.
   */
  getServiceEndpoint(): string {
		  return this.apiURL;
  }
	

  addProductsInCart(product: Product){
    this.cartList.push(product);
  }

  getCartList(){
    return this.cartList;
  }
	
  // Error handling 
  handleError(error: any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
  
}
