import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  filterSearchID!:string;
  evaluateForm!: FormGroup;
  status: string | null = localStorage.getItem('token');
  user_role:string = "";
  orders: Order[] = [];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.status != null) {
      this.user_role = JSON.parse(this.status).user_role;
    }
    this.orders = this.route.snapshot.data['orders'];
    this.evaluateForm = new FormGroup({
      'valoration': new FormControl(0, [Validators.required]),
    });
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
    this.orderService.updateStatusOrder(id, "terminado").subscribe({
      next: ()=>{
        alert('Pedido marcado como entregado');
        window.location.reload();
      },
      error: (error:any) => console.log(error),
    });
  }

  evaluateOrder(id:number){
    let form_values = this.evaluateForm.value;
    if(this.evaluateForm.valid){
      this.orderService.updateValorationOrder(id, form_values['valoration']).subscribe({
        next: ()=>{
          alert('Pedido se ha valorado con exito!');
          window.location.reload();
        },
        error: (error:any) => console.log(error),
      });
  }
}
}
