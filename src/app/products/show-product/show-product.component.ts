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
import { ProductInLocalstrg } from 'src/app/interfaces/product-in-localstrg';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  comment_write_permission:number = 0;
  status: string | null = localStorage.getItem('token');
  addCommentForm!: FormGroup;
  role: string = "normal_user";
  product!: Product;
  products: ProductInLocalstrg[] =[];
  comments!: Comment[];
  order_info!: {'valoration':number, 'country':string};
  user_id!: number;
  product_id!:number;
  amount:any = 0;
  btn_active = true;
  amountForm!: FormGroup;
  has_comments = false;
  show_msg:boolean = false;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private productService: ProductService, private router: Router) {
    if (this.status != null) {
      this.role = JSON.parse(this.status).user_role;
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  ngOnInit(): void {
    //remove first element from proudcts array in local storage if their values are equal to 0
    let prods_session = localStorage.getItem('products');
    if (prods_session != null) {
      this.products = JSON.parse(prods_session);
      this.products.forEach((el) => {
        if (el.amount == 0 && el.product == 0) {
          this.products.splice(this.products.indexOf(el), 1);
        }
      });
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    this.amountForm = new FormGroup({
      'amount_to_buy': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    });
    let dates = this.route.snapshot.data['product'];
    if(this.route.snapshot.queryParams['user_id'] == undefined){
      this.comment_write_permission = 0;
    } else {
      this.comment_write_permission = parseInt(this.route.snapshot.queryParams['user_id']);
    }
    this.product = dates.product;
    this.comments = dates.comments;
    this.amount = dates.amount;
    console.log(this.amount[0].amount);
    console.log(this.comments);
    //if amount es menos que 10  show_msg a true
    if(this.amount[0].amount < 10){
      this.show_msg = true;
    }
    if(this.amount[0].amount == 0){
      this.btn_active = false;
    }
    //check if user has comments in comments
    this.comments.forEach((comment) => {
      if (comment.user_id == this.user_id) {
        this.has_comments = true;
      }
    });
    this.addCommentForm = new FormGroup({
      'content': new FormControl(null, [Validators.required]),
      'valoration': new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
    });
    this.product_id = this.product.id;
    console.log(this.product_id);
    console.log(this.user_id);
    console.log(this.comments);
  }

  medianValoration() {
    let median: number = 0
    let comments_counter: number = 0;
    let all_valoration: number = 0;
    this.comments.forEach((comment) => {
      comments_counter += 1;
      all_valoration += comment.valoration;
    })
    if (all_valoration > 0) {
      median = all_valoration / comments_counter;
    }
    return median;
  }

  addProdToOrder() {
    console.log(this.product);
    if(this.amountForm.valid){
      let form_values = this.amountForm.value;
      let amount = this.product.amount
      amount -= form_values['amount_to_buy'];
      this.productService.editProduct(this.product.id, this.product.name, this.product.price, this.product.description, amount, this.product.image_url, this.product.tag, this.product.visible)
        .subscribe({
          next: () => {
            let prods_session = localStorage.getItem('products');
            if (prods_session != null) {
              this.products = JSON.parse(prods_session);
              //iterate through products to check if product is already in session)
              let is_in_session = false;
              this.products.forEach((product) => {
                if (product.product.id == this.product.id) {
                  is_in_session = true;
                  console.log(product.product.amount)//1
                  product.product.amount -= form_values['amount_to_buy'];
                  console.log(product.product.amount)//0
                  product.amount += form_values['amount_to_buy'];
                  console.log(product)//1
                }
              });
              if (!is_in_session) {
                this.product.amount -= form_values['amount_to_buy'];
                this.products.push({product: this.product, amount: form_values['amount_to_buy']});
              }
              localStorage.setItem('products', JSON.stringify(this.products));
            } else {
              this.product.amount -= form_values['amount_to_buy'];
              this.products.push({product: this.product, amount: form_values['amount_to_buy']});
              localStorage.setItem('products', JSON.stringify(this.products));
            }
            alert("El producto se ha añadido a la cesta");

            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });
          },
          error: error => {
            alert('Error al añadir el producto a la cesta');
          }
        })
    }
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
    console.log(form_values['content'], form_values['valoration'], this.user_id, this.product_id);
    if(this.addCommentForm.valid){
      this.commentService.saveComment(form_values['content'], form_values['valoration'], this.user_id, this.product_id).subscribe({
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
