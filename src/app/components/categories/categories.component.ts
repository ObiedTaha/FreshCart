import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Icategory } from 'src/app/core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  constructor(private _ProductService:ProductService){}

  catergoryData:Icategory[]=[];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.catergoryData=response.data;
      }
    })
    
  }

}
