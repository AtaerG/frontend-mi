import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { Message } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  status: string | null = sessionStorage.getItem('token');
  appointments: Appointment[] =[];
  token: string = "";
  admins:User[] = [];
  user_id:number = 0;
  user_role: string = "";
  disabled: boolean = false;
  //get actual date and time

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
    }
    if(this.user_role == 'admin'){
      this.userService.getAllAppointmentsOfAdmin(this.user_id).subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          for(let app of this.appointments){
            console.log(app);
            //if date is after atual date make disable
            let datetime = app.date+" "+app.time;
            let date_ev = new Date(datetime);
            let date_now = new Date();
              if(date_ev  >= date_now ){
                this.disabled = true;
              }else{
                this.disabled = false;
              }
            }
        }
      });
      } else {
        this.userService.getAllAppointmentsOfUser(this.user_id).subscribe({
          next: (appointments: Appointment[]) => {
            this.appointments = appointments;
            for(let app of this.appointments){
              console.log(app);
              //if date is after atual date make disable
              let datetime = app.date+" "+app.time;
              let date_ev = new Date(datetime);
              let date_now = new Date();
                if(date_ev  >= date_now ){
                  this.disabled = true;
                }else{
                  this.disabled = false;
                }
            }
      }
    });
  }
  }
}
