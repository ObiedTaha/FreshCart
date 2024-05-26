import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: String = 'https://ecommerce.routemisr.com';

  getProducts(pagenumber: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${pagenumber}`);
  };

  getSpecificProduct(productId: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${productId}`);
  };

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  };

  getSpecificCategory(categoryId:string|null):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${categoryId}`);
  }

  getSubCategoriesToCat(subId:string|null):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${subId}/subcategories`)
  }

  getAllBrands(pageNum: number = 1):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands?page=${pageNum}`)
  }

  getSpecificBrand(brandId:string|null):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${brandId}`)
  }
}

