import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { DatePipe } from '@angular/common';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/apiresponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  products: Product[] = [];
  url: string = '';

  constructor(
    override config: ConfigService,
    override http: HttpClient,
  ) {
    super(config, http, 'products');
    this.url = this.getApiUrl();
  }

  getProduct(id: number): Observable<ApiResponse<Product>> {
    const url = this.url + `/${id}`;
    return this.http.get<ApiResponse<Product>>(url);
  }

  getAllProducts(): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams().set('pageSize', 999);
    return this.http.get<ApiResponse<Product[]>>(this.url, { params });
  }

  searchProducts(name: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(
      this.url + '/search?name=' + name,
    );
  }

  getProducts(
    pageNo: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    sortDir: string,
  ): Observable<ApiResponse<Product[]>> {
    if (pageNo === 0) {
      pageNo = 1;
    }
    const postData = {
      pageNo: pageNo,
      pageSize: pageSize,
      searchTerm: searchTerm,
    };
    return this.http.post<ApiResponse<Product[]>>(this.url + '/all', postData);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = this.url + `/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: number): Observable<Product> {
    const url = this.url + `/${id}`;
    return this.http.delete<Product>(url);
  }

  getPopularProductsBySalesCount(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.url}/popular-products-by-sales-count`,
    );
  }

  getPopularProductsByRevenue(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/popular-products-by-revenue`);
  }

  getPopularProductsByViewCount(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.url}/popular-products-by-view-count`,
    );
  }

  getPopularProductsByRating(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/popular-products-by-rating`);
  }
}
