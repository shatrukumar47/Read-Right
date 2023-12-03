import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book.service';
import { PurchaseService } from '../../../../core/services/purchase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  loading: boolean = false;
  purchases: any = [];
  booksList: any = [];
  constructor(private bookService: BookService, private purchaseService: PurchaseService){}

  ngOnInit(): void {
    this.getPurchaseList()
    
  }

  cancelOrder(purchaseID: string){
    this.purchaseService.deletePurchase(purchaseID).subscribe((res)=>{
      this.getPurchaseList()
    },
    (err)=> {
      console.log(err)
    })
  }

  getPurchaseList(){
    this.loading = true;
    this.purchaseService.getPurchaseList().subscribe((res)=>{
      this.purchases = res;
      this.loading = false;
      this.getBooks()
    },
    (err)=> {
      console.log(err)
      this.loading = false;
    })
  }


  getBooks(){
    // let books: any = []; 
    // this.purchases.forEach((item: any)=>{
    //   books = [...books, ...item.books]
    // })
    // this.booksList = books;
    // console.log(this.booksList)
  }
}
