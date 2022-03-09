import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  email:any;
  password:any;

  onSignup(){
    this.authService.login(this.email,this.password)
      .subscribe({
        next: token => {
          console.log(token);
          localStorage.setItem('token',JSON.stringify(token));
          window.location.reload();
          this.router.createUrlTree(['/products']);
        },
        error: error => console.log(error),
      })
  }

}
