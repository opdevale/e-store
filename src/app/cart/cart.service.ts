import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiURL: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private commonService: CommonService) { 
    this.apiURL = this.commonService.getServiceEndpoint();
  }



  placeOrder(order: Order): Observable<Order>{
 
    return this.http.post<Order>(this.apiURL + '/order', order, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /**  
   * Error handling 
   */
   handleError(error: ErrorEvent) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
