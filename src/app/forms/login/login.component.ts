import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  login_complete = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.minLength(8))
    });
  }

  onSignup(){
    if(this.loginForm.valid){
      let form_values = this.loginForm.value;
      this.authService.login(form_values['email'],form_values['password'])
        .subscribe({
          next: token => {
            console.log(token);
            sessionStorage.setItem('token',JSON.stringify(token));
            this.login_complete = true;
            this.router.navigate(['/products']).then(() => {
              window.location.reload();
            });;
         },
          error: error => alert('La contraseña o email son incorrectos!'),
      })
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
