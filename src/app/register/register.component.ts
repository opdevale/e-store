import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterProductService } from './register.service';
import { CommonService } from '../services/common.service';
import { Product } from '../model/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  myForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl(0, [Validators.required, Validators.maxLength(10)]),
    quantity: new FormControl(0, [Validators.required, Validators.maxLength(10)]),
    company: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    year: new FormControl(0, [Validators.required, Validators.maxLength(20)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute,
    private router: Router,
    public registerProductService: RegisterProductService, private commonService: CommonService) {
     
  }

  ngOnInit() {
    this.model = {"productId":456378,"productName":"Refrigerator","description":"Intelli Sense Refrigerator","price":18199,"year":2021,"company":"Samsung","quantity":5,"fileName":'',"contentType":'', "image":[]};
	}

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event: any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileList = event.target.files;
      this.myForm.patchValue({
        fileSource: file
        //this.fileList = file;
      });
    }
  }
 
  
  //Gets called when the user selects an image
  public onFileChanged(imageInput: any) {
   console.log(imageInput.files[0]);
   this.fileList = imageInput.files;
  
  }
  

  onSubmit() { 
    console.log(this.action);

    if (this.myForm.invalid) {
      return;
    }


    this.model.productName = this.myForm.controls.productName.value;
    this.model.description = this.myForm.controls.description.value;
    this.model.company = this.myForm.controls.company.value;
    this.model.quantity = this.myForm.controls.quantity.value;
    this.model.price = this.myForm.controls.price.value;
    
    if(this.action == null || this.action == "Submit"){
      this.registerProductService.addProduct(this.model).subscribe((response: any) => {
        this.submitted = true; 
        this.product = response;
        if(this.product.id){
          this.registerProductService.uploadProduct(this.product.id, this.fileList[0])
          .subscribe((response: any) => {   
            
            this.message = "Image uploaded successfully";
          }
      );
        }
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
