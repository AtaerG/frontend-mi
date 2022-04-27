import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { User } from 'src/app/interfaces/user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  orders: Order[] = [];
  date_orders: any[] = [];
  dates_orders: any[] = [];
  user!:User;
  status:string|null = localStorage.getItem('token');
  user_id: number = 0;
  user_role: string = '';
  user_name: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private orderService: OrderService) {
    if(this.status != null){
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
      this.user_name = JSON.parse(this.status).name;
    }
   }

  public barChartOptions = {
    barThickness: 150,
    maintainAspectRatio: false,
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0], label: 'Sus compras'},
  ];

  ngOnInit(): void {
    this.orderService.getUsersOrder(this.user_id).subscribe({
      next: (data: any) => {
        for (let ob of data) {
          console.log(ob);
          if(ob.status =='ended'){
            this.date_orders.push(ob.total_price);
            let year = ob.created_at.slice(0,4);
            let mes = ob.created_at.slice(5,7);
            let dia = ob.created_at.slice(8,10);
            let converted_date = dia+"/"+mes+"/"+year;
            // check if converted_date is already in the array
            console.log(this.dates_orders.includes(converted_date));
            if(this.dates_orders.includes(converted_date)){
              let index = this.dates_orders.indexOf(converted_date);
              this.barChartData[index].data[0] += ob.total_price;
              continue;
            }
            this.dates_orders.push(converted_date);
            this.barChartLabels = this.dates_orders;
            this.barChartData[0].data = this.date_orders;
          }
        }
      },
      error: (err) => console.log(err),
      }
    );
    this.user = this.route.snapshot.data['user'];
    this.orders = this.route.snapshot.data['orders'];
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
