import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  shippingForm!: FormGroup;
  products:Product[] = [];
  products_id: number[] = [];
  precio_total:number = 0;
  constructor(private orderService:OrderService, private router: Router,private productService:ProductService) { }

  ngOnInit(): void {
    let prods = sessionStorage.getItem('products');
    if(prods != null){
      this.products = JSON.parse(prods);
      this.products.forEach((product)=> {
        this.precio_total+=product.price ;
      });
    }
      this.shippingForm = new FormGroup({
          'direction': new FormControl(null, [Validators.required]),
          'post_code': new FormControl(null, [Validators.required]),
          'city': new FormControl(null, [Validators.required]),
          'state': new FormControl(null, [Validators.required]),
          'country': new FormControl(null, [Validators.required])
      });
  }

  sentOrder(){
    let prods = sessionStorage.getItem('products');
    if(this.shippingForm.valid && prods != null){
      let form_values = this.shippingForm.value;
      this.products.forEach((el)=>{
        this.products_id.push(el.id);
      });
      console.log(this.products_id);
      this.orderService.createOrder(this.products_id.toString(),this.precio_total,'proceeding',form_values['direction'],form_values['post_code'],form_values['city'],form_values['state'],form_values['country'])
      .subscribe({
        next: ()=> {
          sessionStorage.removeItem('products');
          this.router.navigate(['/thanks']).then(() => {
            window.location.reload();
          });
      },
      error: error => {
        console.log(error);
      },
      });
    }
  }

  removeProdFromOrder(product: Product){
    product.amount += 1;
    this.productService.editProduct(this.product.id, this.product.name, this.product.price,  this.product.description, this.product.amount, this.product.image_url, this.product.tag)
    .subscribe({
      next: ()=> {
        let prods_session = sessionStorage.getItem('product');
        if(prods_session != null){
          this.products = JSON.parse(prods_session);
          this.products.push(this.product);
          sessionStorage.setItem('product',JSON.stringify(this.products));
        } else {
          this.products.push(this.product);
          sessionStorage.setItem('products',JSON.stringify(this.products));
        }
      },
      error: error=>console.log(error),
    })
  }

}
