import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { DatePipe } from '@angular/common';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    {
      productName: 'Cooker',
      city: 'Chennai',
      mobile: 1235986986,
    },
    {
      productName: 'Blender',
      city: 'Hyderabad',
      mobile: 8341303459,
    },
    {
      productName: 'Trimmer',
      city: 'Bengaluru',
      mobile: 90876568,
    }
  ];

  constructor(
  ) {
  }

  addProduct(form: any) {
    this.products.push(form.value);
  }

  deleteProduct(i: number) {
    this.products.splice(i, 1);
  }

  getProduct(i: number) {
    return this.products[i];
  }

  getProducts() {
    return this.products;
  }
  
  updateProduct(form: any, i: number) {
    this.products.splice(i, form.value);
  }
}
