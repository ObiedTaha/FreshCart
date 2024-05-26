import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  userInfo:any;

  baseUrl: String = 'https://ecommerce.routemisr.com'


  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, userData)
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, userData)
  }

  decodeToken(): void {
    const encode = localStorage.getItem('token');

    if (encode != null) {
     const decode=jwtDecode(encode);
      this.userInfo=decode;
    }
  }
}