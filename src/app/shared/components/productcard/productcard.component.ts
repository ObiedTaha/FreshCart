import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from 'src/app/core/interfaces/iproduct';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [CommonModule, CuttingPipe, RouterModule],
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent implements OnInit {
  constructor(private _WishlistService: WishlistService, private _ToastrService: ToastrService, private _Renderer2: Renderer2, private _CartService: CartService) { }

  @Input() product!: Iproduct;
  // @Input() flag:boolean=false;

  wishList: string[] = [];
  // wishList=signal<Iproduct[]>([]);

  allProducts: Iproduct[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishList = newData;
      }
    })
  };

  addProduct(id: any, element: HTMLButtonElement): void {
    //that make btn disabled while backend send response
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    //that methode add product to cart 
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        // show message to user with toaster
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        // add update for product at cart 
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: (err) => {
        this._ToastrService.error(err.message);
        this._Renderer2.removeAttribute(element, 'disabled');

      }
    })
  };

  addToWish(productId: string | undefined): void {

    this._WishlistService.addToWishlist(productId).subscribe({
      next: (response) => {

        console.log(response);
        this.wishList = response.data;
        // this.wishList.update(response.data);

        this._ToastrService.success(response.message);
        this._WishlistService.wishNumber.next(response.data.length);

      }
    })
  };

  removeItem(productId: string | undefined): void {
    this._WishlistService.removeFromWish(productId).subscribe({
      next: (response) => {

        this.wishList = response.data;

        this._ToastrService.success(response.message);
        this._WishlistService.wishNumber.next(response.data.length);
        // this.wishList.update(response.data);
  
        // const newproducts = this.allProducts.filter((item: any) => this.wishList.includes(item._id));
        // this.allProducts = newproducts;       
      }
    })
  }



}
