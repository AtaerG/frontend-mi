import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.scss']
})
export class ModUserComponent implements OnInit {

  user!:User;
  modUserForm!: FormGroup;
  password!: string
  status:string|null = localStorage.getItem('token');
  role: string = "";

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    if(this.status != null){
      this.role = JSON.parse(this.status).user_role;
    }
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.password = this.user.password;
    console.log(this.user);
    this.modUserForm = new FormGroup({
      'name': new FormControl(this.user.name, [Validators.required]),
      'surname': new FormControl(this.user.surname, [Validators.required]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'role': new FormControl(this.user.role)
    });
  }

  modificarUser(){
    let form_values = this.modUserForm.value;
    if(this.modUserForm.valid){
      console.log(form_values['password']);
      this.userService.editUser(this.user.id,form_values['name'],form_values['surname'],form_values['email'],form_values['role']).subscribe({
        next: (re)=> {
          alert('Datos se han modificado con exito!')
          this.router.navigate(['/users', this.user.id]).then(() => {
            window.location.reload();
          });
        },
        error: error => {
          console.log(error);
        },
      })
    }
  }

  deleteUser(){
    let con = confirm("Quere eliminar la cuenta de usuario?");
    if(con){
      this.userService.deleteUserAccount(this.user.id).subscribe({
        next: (re)=> {
          localStorage.clear();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });;
        },
        error: error=> console.log(error),
      });
    }
  }
}
