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

  private apiProducts: string = 'http://localhost:3000/products'
  private apiorders: string = 'http://localhost:3000/orders'


  private readonly http = inject(HttpClient)

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiProducts)
  }


  getOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(this.apiorders)
  }
}
