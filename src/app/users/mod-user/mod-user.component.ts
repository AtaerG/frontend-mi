import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user)
    this.modUserForm = new FormGroup({
      'name': new FormControl(this.user.name, [Validators.required, Validators.maxLength(20)]),
      'surname': new FormControl(this.user.surname, [Validators.required, Validators.max(50)]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.minLength(8)),
      'role': new FormControl('normal_user', Validators.minLength(8)),
    });
  }

  modificarUser(){
    let form_values = this.modUserForm.value;
    if(this.modUserForm.valid){
      this.userService.editUser(this.user.id,form_values['name'],form_values['surname'],form_values['email'],form_values['password'],form_values['role']).subscribe({
        next: (re)=> {
          console.log(re);
          //this.router.navigate(['/products']);
        },
        error: error => {
          console.log(error);
        },
      })
    }
  }
}
