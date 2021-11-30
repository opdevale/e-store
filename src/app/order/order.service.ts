import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { Product } from '../model/product';
import { Order } from '../model/order';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiURL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  fileUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }  

  constructor(private http: HttpClient, private commonService: CommonService) { 

    this.apiURL = this.commonService.getServiceEndpoint();
  }

  getOrders(): Observable<Order>{
    return this.http.get<Order>(this.apiURL + '/order',this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update order - Status
   */
  updateOrder(order: Order): Observable<Response>{
    
    return this.http.put<Response>(this.apiURL + '/product', order, this.httpOptions).pipe(
        catchError(this.handleError)
    );
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
