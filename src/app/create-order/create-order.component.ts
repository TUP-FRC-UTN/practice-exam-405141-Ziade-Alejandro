import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../product";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
  orderForm!: FormGroup;

  products: Product[]=[];
  test:number[]=[1,2,3,4,6]

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.orderForm = this.fb.group({
      nombre:['', Validators.required, Validators.minLength(3)],
      email:['', Validators.required, Validators.email],
      productos: this.fb.array([])
    })

    this.loadProducts()
  }

  get productos():FormArray {
    return this.orderForm.get('Productos') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      product:[null, Validators.required],
      cantidad:[1,[Validators.required, Validators.min(1)]],
      precio: [{value:0,disabled:true}],
      sotck:[{value:0,disabled:true}]
    })

    productGroup.get('product')?.valueChanges.subscribe((productID) => {

      const product = this.products.find(product => product.id === productID)

      if (product) {
        productGroup.get('precio')?.setValue(product.price)
        productGroup.get('sotck')?.setValue(product.stock)
      }
    })
    this.productos.push(productGroup)
  }

  removeProduct(index:number) {
    this.productos.removeAt(index)
  }




  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
    } else {
      console.log("no valido")
    }
  }

  private loadProducts() {
    //api implementation
  }
}
