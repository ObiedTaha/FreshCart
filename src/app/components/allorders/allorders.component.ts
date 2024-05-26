import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { Iallorder } from 'src/app/core/interfaces/iallorder';
import { CuttingPipe } from 'src/app/core/pipes/cutting.pipe';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,CuttingPipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService: CartService) { }
  allOrder: Iallorder[] = [];

  ngOnInit(): void {
    this._CartService.getAllOrder().subscribe({
      next: (responce) => {
        
        this.allOrder = responce.data;
      }
    });
  }





}
