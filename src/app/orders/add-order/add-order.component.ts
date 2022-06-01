import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { ProductInLocalstrg } from 'src/app/interfaces/product-in-localstrg';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  status: string | null = localStorage.getItem('token');
  shippingForm!: FormGroup;
  products: ProductInLocalstrg[] = [];
  products_id: number[] = [];
  precio_total:number = 0;
  show_msg:boolean = false;

  constructor(private orderService:OrderService, private router: Router,private productService:ProductService) { }

  ngOnInit(): void {
    let prods = localStorage.getItem('products');
    if(prods != null){
      this.products = JSON.parse(prods);
      this.products.forEach((el)=>{
        this.precio_total += el.product.price * el.amount;
      });
    }
      this.shippingForm = new FormGroup({
          'direction': new FormControl(null, [Validators.required]),
          'post_code': new FormControl(null, [Validators.required, Validators.min(1)]),
          'city': new FormControl(null, [Validators.required]),
          'state': new FormControl(null, [Validators.required]),
          'country': new FormControl(null, [Validators.required])
      });
  }

  sentOrder(){
    if(this.status != null){
    let prods = localStorage.getItem('products');
    if(this.shippingForm.valid && prods != null){
      let form_values = this.shippingForm.value;
      let products = JSON.stringify(prods);
      console.log(products);
      this.orderService.createOrder(products,this.precio_total,'pagado',form_values['direction'],form_values['post_code'],form_values['city'],form_values['state'],form_values['country'])
      .subscribe({
        next: ()=> {
          localStorage.removeItem('products');
          this.router.navigate(['/orders']).then(() => {
            window.location.reload();
          });
      },
      error: (error:HttpErrorResponse) => {
        this.router.navigate(['/access_denied']);
      },
      });
    }
    } else {
      alert('¡Tiene que iniciar sesión!')
    }
  }

  removeProdFromOrder(product: Product){
    this.products.forEach((el)=>{
      if(el.product.id == product.id){
        console.log( el.amount);
        el.amount--;
        console.log(el.amount)
        console.log(el.product.amount);
        el.product.amount++;
        console.log(el.product.amount);
        if(el.amount == 0){
          this.products.splice(this.products.indexOf(el),1);
        }
        this.precio_total -= product.price;
        localStorage.setItem('products',JSON.stringify(this.products));
      }
    });
    this.productService.editProduct(product.id, product.name, product.price, product.description, product.amount, product.image_url, product.tag, product.visible)
    .subscribe({
      next: ()=> {
        let prods_session = localStorage.getItem('products');
        window.location.reload();
      },
      error: error=>console.log(error),
    })
  }
}
