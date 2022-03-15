import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss']
})
export class ShowOrderComponent implements OnInit {

  order: any;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.order  = this.route.snapshot.data['order'];
  }

}
