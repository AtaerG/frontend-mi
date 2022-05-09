import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  shippingForm!: FormGroup;
  status: string | null = localStorage.getItem('token');
  order!:any;

  constructor(private orderService:OrderService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order  = this.route.snapshot.data['order'];
    console.log(this.order);
      this.shippingForm = new FormGroup({
          'direction': new FormControl(this.order.order_details.direction, [Validators.required]),
          'post_code': new FormControl(this.order.order_details.post_code, [Validators.required, Validators.min(1)]),
          'city': new FormControl(this.order.order_details.city, [Validators.required]),
          'state': new FormControl(this.order.order_details.state, [Validators.required]),
          'country': new FormControl(this.order.order_details.country, [Validators.required])
      });
  }

  sentOrder(){
    if(this.shippingForm.valid && this.order.id != null){
      let form_values = this.shippingForm.value;
        this.orderService.editOrder(this.order.id,form_values['direction'],form_values['post_code'],form_values['city'],form_values['state'],form_values['country'])
        .subscribe({
          next: ()=> {
            this.router.navigate(['/orders']).then(() => {
              window.location.reload();
            });
        },
        error: (error:HttpErrorResponse) => {
          console.log(error);
        },
      });
    }
  }
}

