import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl: string = `https://ecommerce.routemisr.com`;

  forgetPassword(userEmail: object): Observable<any> 
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,userEmail);
  }

  resetCode(resetCode: object): Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,resetCode);

  }

  resetPassword(resetPasswordData:object):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,resetPasswordData)
  }

}
