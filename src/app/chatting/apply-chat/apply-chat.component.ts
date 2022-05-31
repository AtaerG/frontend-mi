import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-apply-chat',
  templateUrl: './apply-chat.component.html',
  styleUrls: ['./apply-chat.component.scss']
})
export class ApplyChatComponent implements OnInit {
  status: string | null = localStorage.getItem('token');
  applyMsg!: FormGroup;
  admins: any[] = [];
  user_id: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService, private userService: UserService) { }

  ngOnInit(): void {
    this.admins = this.route.snapshot.data['admins'];
    console.log(this.admins);
    this.applyMsg = new FormGroup({
      'admin_id': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required, Validators.pattern('^(([0-2][0-9])|([3][0-1]))/(([0][0-9])|([1][0-2]))/(2022)$')]),
      'time': new FormControl(null, [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]),
    });
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  apply() {
    if (this.admins != null && this.user_id != null) {
      let form_values = this.applyMsg.value;
      console.log(form_values['date']);
      console.log(this.applyMsg.valid);
      if (this.applyMsg.valid) {
        let year = form_values['date'].slice(0, 4);
        let mes =  form_values['date'].slice(5, 7);
        let dia =  form_values['date'].slice(8, 10);
        let converted_date = dia + "/" + mes + "/" + year;
        let date = new Date(year + '-' + mes + '-' + dia);
        let today = new Date();
        if (date < today) {
          alert("Error! La fecha debe ser posterior a la fecha actual");
          return;
        }
        console.log(form_values['admin_id']);
        console.log(converted_date);
        console.log(form_values['time']);
        this.appointmentService.getAdminsAppointmentsWithDateTime(form_values['admin_id'], converted_date, form_values['time']).subscribe({
          next: (res) => {
            if (res.length == 0) {
              console.log(res);
              this.appointmentService.createAppointment(this.user_id, form_values['admin_id'], converted_date, form_values['time'])
                .subscribe({
                  next: () => {
                    alert("Cita creada con éxito");
                    this.router.navigate(['/chat']).then(() => {
                      window.location.reload();
                    });
                  },
                  error: (er: any) => alert('Error a la hora crear cita. Compruea que no hay ninguna cita con la misma fecha y hora')
                });
            } else {
              alert('Este administardor ya tiene cita asignada para esta fecha y hora. Por favor, cambia el horario o administrador.');
            }

          },
          error: (er: any)=> console.log(er)
        })
      }
      /*
      this.appointmentService.createAppointment(this.user_id, this.admins[random_admin], converted_date, this.applyMsg.value.time)
      .subscribe({
        next: () => {
          /*
          this.router.navigate(['/chat']).then(() => {
            window.location.reload();
          });

        },
        error: (er: any)=> console.log(er)
      });
    } else {
      alert("Error! No se puede asignar una cita");
    }
    */
    }
  }
}
