import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Comment } from 'src/app/interfaces/comment';
import { OrderService } from 'src/app/services/order.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  comment_write_permission:string = '';
  status: string | null = sessionStorage.getItem('token');
  addCommentForm!: FormGroup;
  role: string = "normal_user";
  product!: Product;
  products: Product[] = [];
  comments!: Comment[];
  user_id!: number;
  product_id!:number;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private productService: ProductService, private router: Router) {
    if (this.status != null) {
      this.role = JSON.parse(this.status).user_role;
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  ngOnInit(): void {
    let dates = this.route.snapshot.data['product'];
    this.comment_write_permission = this.route.snapshot.queryParams['comment'];
    this.product = dates.product;
    this.comments = dates.comments;
    this.addCommentForm = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'stars': new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    });
    this.product_id = this.product.id;
    console.log(this.product_id);
    console.log(this.user_id);
    console.log(this.comments);
  }

  medianRaiting() {
    let median: number = 0
    let comments_counter: number = 0;
    let all_stars: number = 0;
    this.comments.forEach((comment) => {
      comments_counter += 1;
      all_stars += comment.stars;
    })
    if (all_stars > 0) {
      median = all_stars / comments_counter;
    }
    return median;
  }

  addProdToOrder() {
    console.log(this.product);
    this.product.amount -= 1;
    this.productService.editProduct(this.product.id, this.product.name, this.product.price, this.product.description, this.product.amount, this.product.image_url, this.product.tag)
      .subscribe({
        next: () => {
          let prods_session = sessionStorage.getItem('products');
          if (prods_session != null) {
            this.products = JSON.parse(prods_session);
            console.log(this.products);
            this.products.push(this.product);
            sessionStorage.setItem('products', JSON.stringify(this.products));
          } else {
            this.products.push(this.product);
            sessionStorage.setItem('products', JSON.stringify(this.products));
          }
          alert("Product added to order");
          this.router.navigate(['/products']).then(() => {
            window.location.reload();
          });
        },
        error: error => console.log(error),
      })
  }


  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe({
      next: ()=>{
        this.router.navigate(['/products']).then(() => {
          window.location.reload();
      })
    },
      error: error => console.log(error),
    });
  }

  deleteComment(comment: Comment) {
    if (comment != undefined) {
      console.log(comment)
      this.productService.deleteComment(comment.id!).subscribe({
        next: ()=>{
          this.router.navigate(['/products/', this.product_id]).then(() => {
            window.location.reload();
        })
      },
        error: error => console.log(error),
      });
    }
  }

  submitComment(){
    let form_values = this.addCommentForm.value;
    console.log(form_values['content'], form_values['stars'], this.user_id, this.product_id);
    if(this.addCommentForm.valid){
      this.commentService.saveComment(form_values['content'], form_values['stars'], this.user_id, this.product_id).subscribe({
        next: ()=>{
          this.router.navigate(['/products/', this.product_id]).then(() => {
            window.location.reload();
        })
      },
        error: error => console.log(error),
      });
    }
  }
}
