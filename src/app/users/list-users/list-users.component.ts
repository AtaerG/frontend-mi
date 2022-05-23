import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users!:User[];
  status:string|null = localStorage.getItem('token');
  role = "";
  user_id = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
    if(this.status != null){
      this.user_id = JSON.parse(this.status).user_id;
      this.role = JSON.parse(this.status).user_role;
    }
  }

}
