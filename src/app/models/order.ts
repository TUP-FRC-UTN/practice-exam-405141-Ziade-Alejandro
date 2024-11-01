import {Product} from "./product";

export class Order {
  "id":string = ""
  customerName:string = ""
  email:string = ""
  products:Product [] = []
  total:number= 0
  orderCode:string= "L.com222249"
  timestamp:Date = new Date()
}
