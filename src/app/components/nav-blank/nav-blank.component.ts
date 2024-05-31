import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(private _Router: Router, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2, private _WishlistService: WishlistService) { }


  cartCount: number = 0;
  wishCount: number = 0;

  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data;
      }
    });

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartCount = response.numOfCartItems;
      }
    });

    this._WishlistService.wishNumber.subscribe({
      next: (data) => {
        this.wishCount = data;
      }
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.wishCount = response.count;


      }
    });

  }



  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._ToastrService.success('You logOut.....')
  }

  @ViewChild('navbar') navbar!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 200) {
      this._Renderer2.addClass(this.navbar.nativeElement, 'px-3');
      // this._Renderer2.addClass(this.navbar.nativeElement, 'py-3');
      this._Renderer2.addClass(this.navbar.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navbar.nativeElement, 'px-3');
      // this._Renderer2.removeClass(this.navbar.nativeElement, 'py-3');
      this._Renderer2.removeClass(this.navbar.nativeElement, 'shadow');
    }
  }

}
