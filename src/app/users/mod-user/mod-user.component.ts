import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
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
  session_user_id: number= 0;
  actual_user: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    if(this.status != null){
      this.role = JSON.parse(this.status).user_role;
      this.session_user_id = JSON.parse(this.status).user_id;
    }
    if(this.session_user_id == this.user.id){
      this.actual_user = true;
    }
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
          alert('¡Datos se han modificado con éxito!')
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
    let con = confirm("¿Quiere eliminar la cuenta de usuario?");
    let token = localStorage.getItem('token');
    console.log(this.session_user_id);
    console.log(this.user.id);
    if(con && token != null){
      this.userService.deleteUserAccount(this.user.id, token).subscribe({
        next: ()=>{
          alert("¡La cuenta de usuario ha sido eliminada con éxito!");
          localStorage.clear();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });;
        }
      });
    }
  }
}
