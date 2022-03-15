import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: Order[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orders = this.route.snapshot.data['orders'];
    console.log(this.orders)
  }

}
