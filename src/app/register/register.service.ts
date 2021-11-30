import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { Product } from '../model/product';



@Injectable({
  providedIn: 'root'
})
export class RegisterProductService {

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

  //Gets called when the user clicks on retieve image button to get the image from back end
  /*getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }*/

  
  
  /**
   * Submit Product details to database
   */
  addProduct(product: Product): Observable<Response>{
    
    return this.http.post<Response>(this.apiURL + '/product', product, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  uploadProduct(id: number, selectedFile: File): Observable<Response>{
    const uploadImageData = new FormData();
   
    uploadImageData.append('imageFile', selectedFile, selectedFile.name);
    this.httpOptions.headers.set('Content-Type', 'multipart/form-data');
    //uploadImageData.append('id', id+'');
    return this.http.post<Response>(this.apiURL + '/upload/'+id, uploadImageData).pipe(
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
