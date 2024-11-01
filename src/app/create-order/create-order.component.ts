import {Component, inject} from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import {Product} from "../models/product";
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {ProductsService} from "../service/products.service";
@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    CurrencyPipe,
  ],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
  //form group (contiene los controles)
  orderForm: FormGroup = new FormGroup({
    //form control es el objeto que tenes que traer para validar
    nombre: new FormControl('the heart', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('loveLost@parahumans.wiki.com', [Validators.required, Validators.email]),
    //es un array de controles
    productos: new FormArray([])
  });
  //variables, contiene la info de la api
  prods: Product[] = [];

//services
//   private fb = inject(FormBuilder);
  private readonly service= inject(ProductsService)


//init
  ngOnInit() {
    this.loadProducts()

  }

//methods
  //te trae el form array de productos que esta en el form group y te lo trae como form array
  get productos(): FormArray {
    return this.orderForm.get('productos') as FormArray;
  }

  // trae los productos eleguidos por el usuario y los mapea a un objeto que tiene esos atributos
  get selectedProducts() {
    return this.productos.controls.map( control => ({
      //filtra por los productos que tengan la misma id, y les trae el nombre que es lo unico que tienen prods select que es igual que form array produtos
      name: this.prods.find(pro=> pro.id===control.get('producto')?.value)?.name,
      quantity: control.get('cantidad')?.value,
      price: control.get('precio')?.value,
      stock: control.get('stock')?.value,
    }))
  }

  get totalPrice() {
    return this.selectedProducts.reduce((total,product)=> total + (product.price * product.quantity), 0)
  }


  /**
   * primero genera un nuevo form group que tiene 4 controles, estos son los valoers que se muestran en el html
   * luego lo empuja a el form array que esta en el form group de arriba, orderForm
   */
  addProduct() {
    const productGroup = new FormGroup({
      producto: new FormControl('',Validators.required),
      cantidad: new FormControl(1,[Validators.required, Validators.min(1)]),
      precio: new FormControl({value:0,disabled:true}),
      stock: new FormControl({value:0,disabled:true})
    })



    this.productos.push(productGroup);
  }

  //saca en el index el form group de form array
  removeProduct(index: number) {
    this.productos.removeAt(index)
  }


  //todo hacer el post de aca
  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
    } else {
      console.log("no valido")
    }
  }

  private loadProducts() {
    //api implementation
    this.service.getProducts().subscribe(data=>{
      this.prods = data
    })
  }

  updateProductDetails($index: number) {
    // busca primero el id que tiene en el html de producto como valor en las opciones
    const selectedProductId = this.productos.at($index).get('producto')?.value;
    //luego setea el producto usando el id para buscarlo
    const selectedProduct = this.prods.find(prod => prod.id == selectedProductId);


    if (selectedProduct) {// si el producto seteado no es nulo
      //se setea al los from group dentro del array los valores del producto en el api de precio y stock
      this.productos.at($index).get('precio')?.setValue(selectedProduct.price)
      this.productos.at($index).get('stock')?.setValue(selectedProduct.stock)
    }
  }

  //validaciones personalizadas


}
