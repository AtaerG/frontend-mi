import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)]),
    });
  }

  createUser(){
    console.log(this.registerForm);
    if(this.registerForm.valid){
      let form_values = this.registerForm.value;
      this.authService.register(form_values['name'], form_values['surname'],form_values['email'],form_values['password'])
      .subscribe({
        next: () => {
          this.authService.login(form_values['email'],form_values['password']).subscribe({
            next: token => {
              console.log(token);
              localStorage.setItem('token',JSON.stringify(token));
              console.log(token);
              this.regitser_complete = true;
              this.router.navigate(['/products']).then(() => {
                window.location.reload();
              });
            },
            error: error => console.log(error),
          });
        },
        error: error =>  {
          alert(error)
        }
      });
    }
  }

  canDeactivate() {
    if(!this.regitser_complete){
      return confirm("Quiere abandonar la pagina? La cuenta no se guardara!");
    } else {
      return true;
    }
  }
}
