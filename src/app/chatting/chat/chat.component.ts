import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { Message } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  status: string | null = localStorage.getItem('token');
  appointments: Appointment[] = [];
  token: string = "";
  admins: User[] = [];
  user_id: number = 0;
  user_role: string = "";
  disabled: boolean = false;

  constructor(private userService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
    }
    if (this.user_role == 'admin') {
      this.userService.getAllAppointmentsOfAdmin(this.user_id).subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          for (let app of this.appointments) {
            let date = app.date;
            let time = app.time;
            let dia = Number(date.slice(0, 2));
            let mes = Number(date.slice(3, 5));
            let year = Number(date.slice(6, 10));
            let mins = Number(time.slice(3, 5));
            let hrs = Number(time.slice(0, 2));
            let app_date = new Date(year, mes - 1, dia, hrs,  mins);
            let today = new Date();
            console.log(today);
            console.log(app_date);
            if (today <= app_date) {
              this.disabled = true;
            } else {
              this.disabled = false;
            }
          }
        }
      });
    } else {
      this.userService.getAllAppointmentsOfUser(this.user_id).subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments;
          for (let app of this.appointments) {
            let date = app.date;
            let time = app.time;
            let dia = Number(date.slice(0, 2));
            let mes = Number(date.slice(3, 5));
            let year = Number(date.slice(6, 10));
            let mins = Number(time.slice(3, 5));
            let hrs = Number(time.slice(0, 2));
            let app_date = new Date(year, mes - 1, dia, hrs,  mins);
            let today = new Date();
            console.log(today);
            console.log(app_date);
            if (today <= app_date) {
              this.disabled = true;
            } else {
              this.disabled = false;
            }
          }
        }
      });
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: error => console.log(error),
    });
  }
}
