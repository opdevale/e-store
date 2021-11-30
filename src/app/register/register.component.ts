import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterProductService } from './register.service';
import { CommonService } from '../services/common.service';
import { Product } from '../model/product';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterProductComponent implements OnInit {

  hotel: Product = {"productId":456378,"productName":"Refrigerator","description":"Intelli Sense Refrigerator","price":18199,"year":2021,"company":"Samsung","quantity":5,"fileName":'',"contentType":'', "image":[]};
  
  
  hotelId: any;
  model: Product = {"productId":456378,"productName":"Refrigerator","description":"Intelli Sense Refrigerator","price":18199,"year":2021,"company":"Samsung","quantity":5,"fileName":'',"contentType":'', "image":[]};
  submitted = false;
  action: string = "Submit";
  formName: string = "Register Product";
  hotelName: string = "";

  product: any;
  fileList: any;
 
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public registerProductService: RegisterProductService, private commonService: CommonService) {
     
  }

  ngOnInit() {
    this.model = {"productId":456378,"productName":"Refrigerator","description":"Intelli Sense Refrigerator","price":18199,"year":2021,"company":"Samsung","quantity":5,"fileName":'',"contentType":'', "image":[]};
	}

 
  
  //Gets called when the user selects an image
  public onFileChanged(imageInput: any) {
   console.log(imageInput.files[0]);
   this.fileList = imageInput.files;
  }
  

  onSubmit() { 
    console.log(this.action);
    
    if(this.action == null || this.action == "Submit"){
      this.registerProductService.addProduct(this.model).subscribe((response: any) => {
        this.submitted = true; 
        this.product = response;
      });
    } 
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    
   
    //Make a call to the Spring Boot Application to save the image
    this.registerProductService.uploadProduct(this.product.id, this.fileList[0])
      .subscribe((response: any) => {   
        
        this.message = "Image uploaded successfully";
      }
      );
  }
    

  

}
