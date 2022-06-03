import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public recentToken: string = ''
  loginForm!: FormGroup;
  login_complete = false;
  recaptchaAvailable = false;

  constructor(private authService: AuthService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service, private productService: ProductService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)])
    });
  }

  onSignup(){
    if(this.loginForm.valid ){
      let form_values = this.loginForm.value;
      this.recaptchaV3Service.execute('importantAction')
      .subscribe((token_recapV3: string) => {
        this.authService.login(form_values['email'],form_values['password'], token_recapV3)
        .subscribe({
          next: token => {
            if(token === true){
              return this.router.navigate(['/error_page']);
            }
            localStorage.setItem('token',JSON.stringify(token));
            if(token.user_role =='admin'){
              let prods_session = localStorage.getItem('products');
              if(prods_session != null){
                let products = JSON.parse(prods_session);
                products.forEach((el:any)=>{
                this.productService.editProduct(el.product.id, el.product.name, el.product.price,el.product.description, (el.product.amount +  el.amount), el.product.image_url, el.product.tag, el.product.visible)
                .subscribe({
                  error: error=>console.log(error),
                })
                });
              }
            }
            localStorage.removeItem('products');
            this.login_complete = true;
            this.router.navigate(['/']).then(() => {
              window.location.reload();
        });
         }
      })
      });
    }
  }
  canDeactivate() {
    if(!this.login_complete){
      return confirm("¿Quiere abandonar la página?");
    } else {
      return true;
    }
  }

}
