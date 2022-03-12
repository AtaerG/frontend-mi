import { Address } from "./address";
import { Product } from "./product";

export interface Order {
  products_id: number[];
  total_prcie:number
  address:  Address;
}
