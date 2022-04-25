import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

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

  constructor(private authService: AuthService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service) { }

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
      .subscribe((token: string) => {
        console.log(token);
        this.authService.login(form_values['email'],form_values['password'])
        .subscribe({
          next: token => {
            sessionStorage.setItem('token',JSON.stringify(token));
            this.login_complete = true;
            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });;
         },
          error: error => alert('La contraseña o email son incorrectos!'),
      })
      });
    }
  }
  canDeactivate() {
    if(!this.login_complete){
      return confirm("Quiere abandonar la pagina?");
    } else {
      return true;
    }
  }

}
