import { Comment } from 'src/app/interfaces/comment';
export interface Product {
  id:number,
  name:string,
  price:number,
  description:string,
  amount:number,
  image_url:string,
  tag:string,
  comments:Comment[],
  visible: string
}

