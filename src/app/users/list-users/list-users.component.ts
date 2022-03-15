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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['users'];
  }

}
