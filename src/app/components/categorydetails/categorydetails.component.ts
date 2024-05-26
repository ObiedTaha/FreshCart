import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from 'src/app/core/interfaces/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {
  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute) { }

  categoryId: string | null = '';
  cateogryDetails: Icategory = {} as Icategory;
  subCategoryData: any[] = [];


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id')
      }
    });


    this._ProductService.getSpecificCategory(this.categoryId).subscribe({
      next: (response) => {
        this.cateogryDetails = response.data;

      }
    });

    this._ProductService.getSubCategoriesToCat(this.categoryId).subscribe({
      next: (response) => {
        this.subCategoryData = response.data;
      }
    })
  }

}
