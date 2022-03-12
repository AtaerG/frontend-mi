import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';

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
  constructor(private orderService:OrderService, private router: Router) { }

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
    if(this.shippingForm.valid){
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

}
