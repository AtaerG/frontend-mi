import { Product } from "./product";

export interface Order {
  id?:number,
  products: Product[];
  total_price:number,
  status:string,
  direction: string,
  post_code: number,
  city: string,
  state: string,
  country: string
}
