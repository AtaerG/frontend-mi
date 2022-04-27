export interface Comment {
  id?:number,
  content: string,
  valoration:number,
  user_id:number,
  name?:string,
  surname?:string,
  product_id:number,
  created_at:number,
  country?: string,
  valoration_order?: number,
}
