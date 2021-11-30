import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getAllProducts(url: string): Observable<Product> {
    return this.http.get<Product>(url + '/product').pipe(
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
  constructor(private http: HttpClient) { }
}
