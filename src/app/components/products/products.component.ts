import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Iproduct } from 'src/app/core/interfaces/iproduct';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductcardComponent } from 'src/app/shared/components/productcard/productcard.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttingPipe, NgxPaginationModule,FormsModule,SearchPipe,ProductcardComponent,TranslateModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  constructor(private _ProductService: ProductService) { }
  allProducts: Iproduct[] = [];
  searchTerm:string='';
  //pagination variables
  pageSize: number = 0; //limit
  currentPage: number = 1;
  total: number = 0;



  pageChanged(event:any):void{
    this._ProductService.getProducts(event).subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total=response.results;

      },
      error: (err) => {
        console.log(err);

      }
    });
  }


  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total=response.results;

      }
    });
  }

}
