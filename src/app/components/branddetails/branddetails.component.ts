import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.scss']
})
export class BranddetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductService:ProductService){}

  brandData:any= {};
  brandId:string|null='';


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.brandId = params.get('id');
      }
    });

    this._ProductService.getSpecificBrand(this.brandId).subscribe({
      next:(response)=>{
        this.brandData=response.data;
      }
    })
    
  }

}
