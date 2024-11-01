import {Component, inject} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Order} from "../models/order";
import {DatePipe} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  //services
  private serviceOrderss= inject(ProductsService);
  //variables
  orders:Order[] = [];

  filtro = new FormControl('');

  //methods

  ngOnInit(){
    this.loadOrders()

  }

  loadOrders(){


    this.filtro.valueChanges.subscribe(data=>{
      if(data===null || data === ''){
        return this.loadOrders()
      }

      this.orders = this.orders.filter(
        order => order.customerName.toLowerCase().includes(data.toLowerCase()) ||
          order.email.toLowerCase().includes(data.toLowerCase())
      )
    })


    this.serviceOrderss.getOrders().subscribe(orders => {
      this.orders= orders
      console.log(this.orders)
    })
  }

}
