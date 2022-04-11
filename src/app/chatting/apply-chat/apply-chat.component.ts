import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-apply-chat',
  templateUrl: './apply-chat.component.html',
  styleUrls: ['./apply-chat.component.scss']
})
export class ApplyChatComponent implements OnInit {
  status: string | null = sessionStorage.getItem('token');
  applyMsg!: FormGroup;
  admins:number[] =[];
  user_id:number = 0;
  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.admins = this.route.snapshot.data['admins'];
    this.applyMsg = new FormGroup({
      'date': new FormControl(null, [Validators.required, Validators.min(0)]),
      'time': new FormControl(null, [Validators.required]),
    });
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  apply(){
    let random_admin = Math.floor(Math.random() * this.admins.length);
    this.appointmentService.createAppointment(this.user_id, this.admins[random_admin], this.applyMsg.value.date, this.applyMsg.value.time)
    .subscribe({
      error: (er: any)=> console.log(er)
    });
  }

}
