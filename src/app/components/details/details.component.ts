import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Iproduct } from 'src/app/core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule,TranslateModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService,private _Renderer2:Renderer2,private _CartService:CartService,private _ToastrService:ToastrService,private _Router:Router) { }
  productId!: string | null;

  specificProducts: any =null;


  specificProductOptions: OwlOptions = {
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

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      }
    });

    this._ProductService.getSpecificProduct(this.productId).subscribe({
      next: ({ data }) => {
        this.specificProducts=data;
      }
    })


  }


  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    if(''||null != localStorage.getItem('token')){

      this._CartService.addToCart(id).subscribe({
        next:(response)=>{
          this._ToastrService.success(response.message);
          this._Renderer2.removeAttribute(element,'disabled');
          this._CartService.cartNumber.next(response.numOfCartItems)
        },
        error:(err)=>{
          this._ToastrService.error(err.message);
          this._Renderer2.removeAttribute(element,'disabled')
          
        }
      })
    } else {
      this._Router.navigate(['/login']);
      this._ToastrService.warning('You should Login or Register if you do not have ');
    }

  }

}
