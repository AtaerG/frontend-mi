import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  status: string | null = sessionStorage.getItem('token');
  user_role:string = "";
  orders: Order[] = [];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.status != null) {
      this.user_role = JSON.parse(this.status).user_role;
    }
    this.orders = this.route.snapshot.data['orders'];
    console.log(this.orders)
  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe({
      next: ()=>{
        alert('Pedido eliminado. El dinero pronto volvera a su cuenta');
        window.location.reload();
     },
      error: (error:any) => console.log(error),
    });
  }

  delieveredOrder(id:number){
    this.orderService.updateOrder(id, "ended").subscribe({
      next: ()=>{
        alert('Pedido marcado como entregado');
        window.location.reload();
      },
      error: (error:any) => console.log(error),
    });
  }

}
