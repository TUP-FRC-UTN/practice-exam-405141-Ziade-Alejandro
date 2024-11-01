import {Component, inject} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Order} from "../models/order";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  //services
  private serviceOrderss= inject(ProductsService);
  //variables
  orders:Order[] = [];

  //methods

  ngOnInit(){
    this.loadOrders()

  }

  loadOrders(){
    this.serviceOrderss.getOrders().subscribe(orders => {
      this.orders= orders
      console.log(this.orders)
    })
  }

}
