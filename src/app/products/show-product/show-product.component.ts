import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  product!: Product;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

  addProdToOrder(){
    console.log(this.product);
    this.orderService.productAddedToOrder(this.product).subscribe({
      error:error=>console.log(error),
    })
  }

}
