import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: string = `https://ecommerce.routemisr.com`;

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, {
      productId: productId,
    }
    )
  }

  getCartUser(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`)

  }

  removeSpecificProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId} `)
  };

  updateCartCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`,
      {
        count: count,
      }
    )
  };

  clearCart(): Observable<any> {
    return this._HttpClient.delete(` ${this.baseUrl}/api/v1/cart`)
  };

  checkOut(cartId:string|null,orderInfo:object):Observable<any>
  {
     return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress:orderInfo
      }
     )
  }

  getAllOrder():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/`)
  }

}
