import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttingPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, private _Renderer2: Renderer2, private _ToastrService: ToastrService) { }
  cartDetails: any = null;



  changeCount(count: number, id: string, ele1: HTMLButtonElement, ele2: HTMLButtonElement): void {
    if (count > 0) {
      this._Renderer2.setAttribute(ele1, 'disabled', 'true');
      this._Renderer2.setAttribute(ele2, 'disabled', 'true');

      this._CartService.updateCartCount(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(ele1, 'disabled');
          this._Renderer2.removeAttribute(ele2, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(ele1, 'disabled');
          this._Renderer2.removeAttribute(ele2, 'disabled');
        }
      })
    }



  };

  removeItem(id: string, elem: HTMLButtonElement): void {
    // this._Renderer2.setAttribute(elem, 'disabled', 'true');
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          this._CartService.removeSpecificProduct(id).subscribe({
            next: (response) => {
              this.cartDetails = response.data;
              this._CartService.cartNumber.next(response.numOfCartItems);
              this._ToastrService.success('Delete Product Successfully');
              this.ngOnInit()
            },
            error: (err) => {
              this._Renderer2.removeAttribute(elem, 'disabled');
            }
          })
        })
      }
    });
  };

  clear(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          this._CartService.clearCart().subscribe({
            next: (response) => {
              if (response.message === 'success') {
                this.cartDetails = null;
                this._CartService.cartNumber.next(response.numOfCartItems);
                this._ToastrService.success('All Cart Deleted');
              }
            }
          })
        })
      }
    });
  }

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        this.cartDetails = response.data;

      },
      error: (err) => {


      }
    })
  };
}
