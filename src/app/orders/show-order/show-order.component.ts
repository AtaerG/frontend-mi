import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss']
})
export class ShowOrderComponent implements OnInit {
  evaluateForm!: FormGroup;
  status: string | null = localStorage.getItem('token');
  ended: string = '';
  order: any;
  user_id: number = 0;
  user_role:string = "";
  constructor(private route: ActivatedRoute, private orderService: OrderService,private router: Router) { }

  ngOnInit(): void {
    this.order  = this.route.snapshot.data['order'];
    this.ended = this.route.snapshot.queryParams['ended'];
    if (this.status != null) {
      this.user_role = JSON.parse(this.status).user_role;
      this.user_id  = JSON.parse(this.status).user_id;
    }
    this.evaluateForm = new FormGroup({
      'valoration': new FormControl(0, [Validators.required]),
    });
  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe({
      next: ()=>{
        if(this.user_role == 'admin'){
          alert('¡Pedido eliminado con éxito!');
        } else {
          alert('Pedido eliminado. El dinero pronto volverá a su cuenta');
        }
        this.router.navigate(['/orders']).then(() => {
          window.location.reload();
        });
     },
      error: (error:any) => alert("Error a la hora de eliminar el pedido, por favor ponga en contacto con el administrador"),
    });
  }

  delieveredOrder(id:number){
    this.orderService.updateStatusOrder(id, "terminado").subscribe({
      next: ()=>{
        alert('¡Pedido marcado como entregado!');
        window.location.reload();
      },
      error: (error:any) => alert("Error a la hora de marcar el pedido como entregado, por favor ponga en contacto con el administrador"),
    });
  }

  evaluateOrder(id:number){
    let form_values = this.evaluateForm.value;
    if(this.evaluateForm.valid){
      this.orderService.updateValorationOrder(id, form_values['valoration']).subscribe({
        next: ()=>{
          alert('¡Pedido se ha valorado con éxito!');
          window.location.reload();
        },
        error: (error:any) => alert("Error a la hora de valorar el pedido, por favor ponga en contacto con el administrador"),
      });
  }
}
}
