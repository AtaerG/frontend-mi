import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Comment } from 'src/app/interfaces/comment';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  status:string|null = sessionStorage.getItem('token');
  role: string = "normal_user";
  product!: Product;
  products:Product[] = [];
  comments!:Comment[];
  user!:User;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private userService:UserService, private productService: ProductService) {
    if(this.status != null){
      this.role = JSON.parse(this.status).user_role;
    }
  }

  ngOnInit(): void {
    let dates = this.route.snapshot.data['product'];
    this.product = dates.product;
    this.comments = dates.comments;
  }

  medianRaiting(){
    let median:number = 0
    let comments_counter:number = 0;
    let all_stars: number = 0;
    this.comments.forEach((comment)=> {
      comments_counter +=1;
      all_stars += comment.stars;
    })
    if(all_stars > 0){
      median = all_stars/comments_counter;
    }
    return median;
  }

  addProdToOrder(){
    console.log(this.product);
    this.product.amount -= 1;
    this.productService.editProduct(this.product.id, this.product.name, this.product.price,  this.product.description, this.product.amount, this.product.image_url, this.product.tag)
    .subscribe({
      next: ()=> {
        let prods_session = sessionStorage.getItem('products');
        if(prods_session != null){
          this.products = JSON.parse(prods_session);
          console.log( this.products);
          this.products.push(this.product);
          sessionStorage.setItem('products',JSON.stringify(this.products));
        } else {
          this.products.push(this.product);
          sessionStorage.setItem('products',JSON.stringify(this.products));
        }
      },
      error: error=>console.log(error),
    })
  }


  deleteProduct(){
    this.productService.deleteProduct(this.product.id).subscribe({
      error: error=>console.log(error),
    });
  }

  deleteComment(comment: Comment){
    if(comment != undefined){
      console.log(comment)
      this.productService.deleteComment(comment.id!).subscribe({
        error: error=>console.log(error),
      });
    }
  }

}
