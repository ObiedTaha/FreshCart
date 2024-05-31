import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistControlerService {

  constructor(private _WishlistService:WishlistService) { }

  
  
}
