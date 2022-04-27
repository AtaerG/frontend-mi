import { ConstantPool } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../interfaces/order';

@Pipe({
  name: 'orderFind'
})
export class OrderFindPipe implements PipeTransform {

  transform(orders: Order[], filterByID: string): Order[] {
    let orders_new:Order[] = orders;
    const filterID = filterByID;
    if(filterID != null ){
      orders_new  =  orders.filter(order => order.id.toString().includes(filterID));
    }
    return orders_new;
  }

}
