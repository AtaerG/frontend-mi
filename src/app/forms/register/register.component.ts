import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  password_controller:string ="";
  email_controller:string ="";
  regitser_complete = false;

  constructor(private authService: AuthService, private router: Router, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)]),
    });
  }

  createUser(){

    if(this.registerForm.valid ){
      let form_values = this.registerForm.value;
      this.recaptchaV3Service.execute('importantAction')
      .subscribe((token_recapV3: string) => {
        this.authService.register(form_values['name'], form_values['surname'],form_values['email'],form_values['password'], token_recapV3)
        .subscribe();
    });
  }
}
}
