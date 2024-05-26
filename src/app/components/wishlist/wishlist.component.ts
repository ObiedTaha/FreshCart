import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iproduct } from 'src/app/core/interfaces/iproduct';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ProductcardComponent } from 'src/app/shared/components/productcard/productcard.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CuttingPipe, RouterLink, ProductcardComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService: WishlistService) { }
  allProducts: Iproduct[] = [];
  
  wishList: string[] = [];
  // wishList=signal<Iproduct[]>([]);

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        
      }
    });
  };


}