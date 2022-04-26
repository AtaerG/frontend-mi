import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  admins: any [] =[];
  user_id:number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  this.admins = this.route.snapshot.data['admins'];
    console.log(this.admins);
    this.applyMsg = new FormGroup({
      'date': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]),
    });
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  apply(){
    if(this.admins != null && this.user_id != null){
      let random_admin = Math.floor(Math.random() * this.admins.length);
      let year = this.applyMsg.value.date.slice(0,4);
      let mes = this.applyMsg.value.date.slice(5,7);
      let dia = this.applyMsg.value.date.slice(8,10);
      let converted_date = dia+"/"+mes+"/"+year;
      let date = new Date(year+'-'+mes+'-'+dia);
      let today = new Date();
      console.log(today);
      console.log(date);
      console.log(date  < today);
      if(date  < today){
        alert("Error! La fecha debe ser posterior a la fecha actual");
        return;
      }
      this.appointmentService.createAppointment(this.user_id, this.admins[random_admin], converted_date, this.applyMsg.value.time)
      .subscribe({
        next: () => {
          this.router.navigate(['/chat']).then(() => {
            window.location.reload();
          });
        },
        error: (er: any)=> alert(er)
      });
    } else {
      alert("Error! No se puede asignar una cita");
    }
  }
}
