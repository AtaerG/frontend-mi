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
  status:string|null = sessionStorage.getItem('token');
  user_id: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private orderService: OrderService) {
    if(this.status != null){
      this.user_id = JSON.parse(this.status).user_id;
    }
   }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0], label: 'Precio total de la compra'},
  ];


  ngOnInit(): void {
    this.orderService.getUsersOrder(this.user_id).subscribe({
      next: (data: any) => {
        for (let ob of data) {
          this.date_orders.push(ob.total_price);
          let year = ob.created_at.slice(0,4);
          let mes = ob.created_at.slice(5,7);
          let dia = ob.created_at.slice(8,10);
          let converted_date = dia+"/"+mes+"/"+year;
          this.dates_orders.push(converted_date);
          this.barChartLabels = this.dates_orders;
          this.barChartData[0].data = this.date_orders;
        }
      },
      error: (err) => console.log(err),
      }
    );
    console.log(this.orders);
    this.user = this.route.snapshot.data['user'];
  }
}
