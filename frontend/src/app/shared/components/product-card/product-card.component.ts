import { Component, Input, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() item: any = {};
  @Input() openModalInput: any;


  constructor(private router: Router, private cartService: CartService){}

  addToCart(){
    this.cartService.addToCart(this.item).subscribe((res)=>{
      console.log(res);
      alert(res.message);
    },
    (err)=>{
      console.log(err)
    })
  }

  readingList(bookID: string): void{
    this.openModalInput(bookID);
  }


  handleViewDetails(){
    this.router.navigate(['/books', this.item._id]);
  }
}
