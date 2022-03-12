import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {

  shippingForm!: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.shippingForm = new FormGroup({
      'address': new FormGroup({
        'direction': new FormControl(null, [Validators.required]),
        'post_code': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'state': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required])
      }),
      'whant_publ': new FormControl(null)
    });
  }

  sentOrder(){
    if(this.shippingForm.valid){
      this.router.navigate(['/products']).then(() => {
        window.location.reload();
      });
    }
  }

}
