import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  user!:User;
  status:string|null = sessionStorage.getItem('token');
  user_id: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    if(this.status != null){
      this.user_id = JSON.parse(this.status).user_id;
    }
   }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    console.log( this.user_id);
    console.log(this.user.id);
  }

}
