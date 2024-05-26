import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],

  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService: ProductService) { }
  brands: any[] = [];
  //pagination variables
  pageSize: number = 0; //limit
  currentPage: number = 1;
  totalItem: number = 0;

  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.totalItem = response.results;
        this.currentPage = response.metadata.currentPage;
      }
    });
  }

  pageChanged(event: any): void {
    this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        this.pageSize = response.metadata.limit;
        this.totalItem = response.results;
        this.currentPage = response.metadata.currentPage;
      }
    });


  }

}
