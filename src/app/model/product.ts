import { Byte } from "@angular/compiler/src/util";

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  company: string;
  year:number;
  quantity: number;
  fileName: string;
  contentType: string;
  image: any;
}