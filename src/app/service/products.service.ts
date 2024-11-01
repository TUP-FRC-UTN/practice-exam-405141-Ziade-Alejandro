import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from "../models/product";
import {map, Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // constructor() { }

  private api: string = 'http://localhost:3000/products'


  private readonly http = inject(HttpClient)

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api)
  }

  checkOrderLimit(email: string): Observable<boolean> {
    return this.http.get<Order[]>(`http://localhost:3000/orders?email=${email}`).pipe(
      map(orders => {
        const recentOrders = orders.filter(order => new Date(order.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000));
        return recentOrders.length >= 3;
      })
    );
  }
}
