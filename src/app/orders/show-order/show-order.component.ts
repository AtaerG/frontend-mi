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
  status: string | null = sessionStorage.getItem('token');
  ended: string = '';
  order: any;
  user_role:string = "";
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.order  = this.route.snapshot.data['order'];
    this.ended = this.route.snapshot.queryParams['ended'];
    if (this.status != null) {
      this.user_role = JSON.parse(this.status).user_role;
    }
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
