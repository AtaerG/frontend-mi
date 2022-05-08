import { Product } from "./product";

export interface Order {
  order_detail: any;
  id:number,
  products: Product[];
  total_price:number,
  status:string,
  direction: string,
  post_code: number,
  city: string,
  state: string,
  country: string,
  valoration: 0
}
