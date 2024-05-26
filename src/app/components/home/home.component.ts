import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from 'src/app/core/interfaces/icategory';
import { Iproduct } from 'src/app/core/interfaces/iproduct';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';
import { ProductService } from 'src/app/core/services/product.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ProductcardComponent } from 'src/app/shared/components/productcard/productcard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttingPipe, CarouselModule, RouterLink,ProductcardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //dependece injection for class that use at this component
  constructor(private _ProductService: ProductService,private _WishlistService: WishlistService) { }

  allProducts: Iproduct[] = [];
  categories: Icategory[] = [];
  wishList: string[] = [];

  // owl carosal for category
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  };

  // owl carosal for main Slider 
  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }



  ngOnInit(): void {
    // add product to arry to show it at home and for loop on it
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;

      }
    });
    //add category 
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        
      }
    });
  };
}
