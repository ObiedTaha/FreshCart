import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute ,private _FormBuilder:FormBuilder,private _CartService:CartService) { }
  cartId: string | null = '';

  orderForm:FormGroup=this._FormBuilder.group({
    details:['',[Validators.required,Validators.minLength(5)]],
    city:['',[Validators.required,Validators.minLength(3)]],
    phone:['',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    
  })

  handerForm():void{
    this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
      next:(response)=>{
        if(response.status=='success'){
          window.open(response.session.url,'_self')
        }
      }
    })
    
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        

      }
    })
  }

}
