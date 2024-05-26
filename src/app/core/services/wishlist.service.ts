import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: String = 'https://ecommerce.routemisr.com';
  
  wishNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToWishlist(productId: string | undefined): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
      {
        productId: productId
      });
  };

  getWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`)
  }

  removeFromWish(productId: string | undefined): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
