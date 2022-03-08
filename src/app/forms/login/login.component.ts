import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
        },
        error: error => console.log(error),
      })
  }

}
