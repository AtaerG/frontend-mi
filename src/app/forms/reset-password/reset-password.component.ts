import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token_str!:any;
  resetPasswordForm!:FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, Validators.minLength(8)),
      'password_confirm': new FormControl(null, Validators.minLength(8))
    });
    let email = JSON.parse(sessionStorage['token']).email;
    this.authService.getPasswordChangeToken(email).subscribe({
      next: (tkn)=>{
        this.token_str = tkn;
      },
      error: (er)=> console.log(er),
    });
  }

  changePassword(){
    console.log(this.token_str);
    if(this.resetPasswordForm.valid){
      let form_values = this.resetPasswordForm.value;
      if(form_values['password_confirm'] ===  form_values['password']){
        this.authService.changePassword(this.token_str, form_values['password'],form_values['password_confirm']).subscribe({
          error: (er)=> console.log(er),
        })
      }
    }
  }


}
